import * as actionTypes from "./actionTypes";

export const startNewPost = (data) => {
  return {
    type: actionTypes.START_NEWPOST,
    data: data,
  };
};

export const postSuccess = () => {
  return {
    type: actionTypes.POST_NEWPOST_SUCCESS,
  };
};

export const postFail = (error) => {
  return {
    type: actionTypes.POST_NEWPOST_FAIL,
    error: error,
  };
};

export const fetchPosts = () => {
  return {
    type: actionTypes.FETCH_POSTS,
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: posts,
  };
};

export const fetchPostsFail = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error,
  };
};

export const fetchMyPosts = (userId) => {
  return {
    type: actionTypes.FETCH_MYPOSTS,
    userId: userId,
  };
};

export const fetchMyPostsSuccess = (myPosts) => {
  return {
    type: actionTypes.FETCH_MYPOSTS_SUCCESS,
    myPosts: myPosts,
  };
};

export const fetchMyPostsFail = (error) => {
  return {
    type: actionTypes.FETCH_MYPOSTS_FAIL,
    error: error,
  };
};
