import * as actionTypes from "./actionTypes";

export const startAuth = (data) => {
  return { type: actionTypes.START_AUTH, payload: data };
};

export const startAuthSaga = () => {
  return { type: actionTypes.START_AUTH_SAGA };
};

export const startAuthSuccess = (token, userId) => {
  return { type: actionTypes.START_AUTH_SUCCESS, token: token, userId: userId };
};

export const startAuthFail = (error) => {
  return { type: actionTypes.START_AUTH_FAIL, error: error };
};

export const uploadPersonalData = (data, token, userId) => {
  return {
    type: actionTypes.PERSONAL_DATA_AUTH,
    data: data,
    token: token,
    userId: userId,
  };
};

export const uploadPersonalDataSuccess = () => {
  return {
    type: actionTypes.PERSONAL_DATA_AUTH_SAGA,
  };
};

export const userConfirmFirstLogin = () => {
  return { type: actionTypes.CONFIRM_FIRST_LOGIN };
};

export const initLogout = (expirationTime) => {
  return {
    type: actionTypes.INIT_LOGOUT,
    expirationTime: expirationTime,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.INIT_LOGOUT_SAGA,
  };
};

export const autoLogin = () => {
  return {
    type: actionTypes.AUTO_LOGIN,
  };
};
