import { takeEvery, all } from "redux-saga/effects";

import {
  checkAuthTimoutSaga,
  logoutSaga,
  initAuthSaga,
  uplodaPersonalDataSaga,
  authCheckStateSaga,
} from "./auth";
import { fetchPersonalDataSaga } from "./personalData";
import { startNewPostSaga, fetchPostsSaga, fetchMyPostsSaga } from "./posts";
import * as actionTypes from "../actions/actionTypes";

export function* watchPosts() {
  yield all([
    takeEvery(actionTypes.START_NEWPOST, startNewPostSaga),
    takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga),
    takeEvery(actionTypes.FETCH_MYPOSTS, fetchMyPostsSaga),
  ]);
}

export function* watchPersonalData() {
  yield takeEvery(actionTypes.FETCH_PERSONAL_DATA, fetchPersonalDataSaga);
}

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.INIT_LOGOUT, checkAuthTimoutSaga),
    takeEvery(actionTypes.LOGOUT, logoutSaga),
    takeEvery(actionTypes.START_AUTH, initAuthSaga),
    takeEvery(actionTypes.PERSONAL_DATA_AUTH, uplodaPersonalDataSaga),
    takeEvery(actionTypes.AUTO_LOGIN, authCheckStateSaga),
  ]);
}

export default function* rootSaga() {
  yield all([watchPosts(), watchAuth(), watchPersonalData()]);
}
