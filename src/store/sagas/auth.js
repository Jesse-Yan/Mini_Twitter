import { put, delay, call } from "redux-saga/effects";
import axios from "axios";
import axiosTweet from "../../axios-mini-tweet";
import * as actionCreators from "../actions/index";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield put(actionCreators.logoutSucceed());
  yield put(actionCreators.clearData());
}

export function* checkAuthTimoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actionCreators.logout());
}

export function* initAuthSaga(action) {
  yield put(actionCreators.startAuthSaga());
  let authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbJsSuJRRBqlBCaub6b50-Qc3H6SV5ApM";
  if (!action.payload.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbJsSuJRRBqlBCaub6b50-Qc3H6SV5ApM";
  }

  try {
    const response = yield axios.post(url, authData);

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate);
    if (action.payload.isSignUp) {
      yield put(
        actionCreators.uploadPersonalData(
          action.payload,
          response.data.idToken,
          response.data.localId
        )
      );
    }
    yield put(
      actionCreators.startAuthSuccess(
        response.data.idToken,
        response.data.localId
      )
    );
    yield put(actionCreators.initLogout(response.data.expiresIn * 1000));
  } catch (error) {
    try {
      yield put(actionCreators.startAuthFail(error.response.data.error));
    } catch (error) {}
  }
}

export function* uplodaPersonalDataSaga(action) {
  let personalData = {
    firstName: action.data.firstName,
    lastName: action.data.lastName,
    gender: action.data.gender,
    userId: action.userId,
  };
  try {
    yield axiosTweet.post(`users.json?auth=${action.token}`, personalData);
    yield put(actionCreators.uploadPersonalDataSuccess());
  } catch (error) {
    yield put(actionCreators.startAuthFail(error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actionCreators.logoutSucceed());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actionCreators.startAuthSuccess(token, userId));
      yield put(
        actionCreators.initLogout(
          expirationDate.getTime() - new Date().getTime()
        )
      );
    } else {
      yield put(actionCreators.logoutSucceed());
    }
  }
}
