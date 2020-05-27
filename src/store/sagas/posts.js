import { put } from "redux-saga/effects";
import axiosTweet from "../../axios-mini-tweet";

import * as actionCreators from "../actions/index";

export function* startNewPostSaga(action) {
  const data = {
    text: action.data.text,
    date: action.data.date,
    userId: action.data.userId,
    firstName: action.data.firstName,
    gender: action.data.gender,
  };
  try {
    yield axiosTweet.post(`/posts.json?auth=${action.data.token}`, data);
    yield put(actionCreators.postSuccess());
    yield put(actionCreators.fetchPosts());
  } catch (error) {
    yield put(actionCreators.postFail(error));
  }
}

export function* fetchPostsSaga(action) {
  try {
    const response = yield axiosTweet.get(`/posts.json`);
    let posts = [];
    for (let key in response.data) {
      posts.push({ postId: key, ...response.data[key] });
    }
    yield put(actionCreators.fetchPostsSuccess(posts.reverse()));
  } catch (error) {
    yield put(actionCreators.fetchPostsFail(error));
  }
}

export function* fetchMyPostsSaga(action) {
  try {
    const userId = action.userId;
    const queryParam = `?orderBy="userId"&equalTo="${userId}"`;
    const response = yield axiosTweet.get(`/posts.json${queryParam}`);
    let posts = [];
    for (let key in response.data) {
      posts.push({ postId: key, ...response.data[key] });
    }
    yield put(actionCreators.fetchMyPostsSuccess(posts.reverse()));
  } catch (error) {
    yield put(actionCreators.fetchMyPostsFail(error));
  }
}
