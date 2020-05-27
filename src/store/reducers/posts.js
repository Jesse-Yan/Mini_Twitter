import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../shared/utility";

const initialState = {
  posts: [],
  myPosts: [],
  fetchLoading: false,
  newPostLoading: false,
  error: null,
};

const startNewPost = (state, action) => {
  return updateObject(state, { newPostLoading: true, error: null });
};

const postSuccess = (state, action) => {
  return updateObject(state, { newPostLoading: false, error: null });
};

const postFail = (state, action) => {
  return updateObject(state, { newPostLoading: false, error: action.error });
};

const fetchPosts = (state, action) => {
  return updateObject(state, { fetchLoading: true, error: null });
};

const fetchPostsSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.posts,
    fetchLoading: false,
    error: null,
  });
};

const fetchPostsFail = (state, action) => {
  return updateObject(state, { fetchLoading: false, error: action.error });
};

const fetchMyPosts = (state, action) => {
  return updateObject(state, { fetchLoading: true, error: null });
};

const fetchMyPostsSuccess = (state, action) => {
  return updateObject(state, {
    myPosts: action.myPosts,
    fetchLoading: false,
    error: null,
  });
};

const fetchMyPostsFail = (state, action) => {
  return updateObject(state, { fetchLoading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_NEWPOST:
      return startNewPost(state, action);
    case actionTypes.POST_NEWPOST_SUCCESS:
      return postSuccess(state, action);
    case actionTypes.POST_NEWPOST_FAIL:
      return postFail(state, action);
    case actionTypes.FETCH_POSTS:
      return fetchPosts(state, action);
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionTypes.FETCH_POSTS_FAIL:
      return fetchPostsFail(state, action);
    case actionTypes.FETCH_MYPOSTS:
      return fetchMyPosts(state, action);
    case actionTypes.FETCH_MYPOSTS_SUCCESS:
      return fetchMyPostsSuccess(state, action);
    case actionTypes.FETCH_MYPOSTS_FAIL:
      return fetchMyPostsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
