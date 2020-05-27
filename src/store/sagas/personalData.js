import { put } from "redux-saga/effects";
import axiosTweet from "../../axios-mini-tweet";

import * as actionCreators from "../actions/index";

export function* fetchPersonalDataSaga(action) {
  const token = action.token;
  const userId = action.userId;

  const queryParam = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  try {
    const response = yield axiosTweet.get("/users.json" + queryParam);
    let data = {};
    for (let key in response.data) {
      data = { ...data, ...response.data[key] };
    }
    yield put(actionCreators.fetchPersonDataSuccess(data));
  } catch (error) {
    yield put(actionCreators.fetchPersonalDataFail(error));
  }
}
