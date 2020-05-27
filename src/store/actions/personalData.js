import * as actionTypes from "./actionTypes";

export const fetchPersonalData = (token, userId) => {
  return {
    type: actionTypes.FETCH_PERSONAL_DATA,
    token: token,
    userId: userId,
  };
};

export const fetchPersonDataSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PERSONAL_DATA_SUCCESS,
    data: data,
  };
};

export const fetchPersonalDataFail = (error) => {
  return {
    type: actionTypes.FETCH_PERSONAL_DATA_FAIL,
    error: error,
  };
};

export const clearData = () => {
  return {
    type: actionTypes.CLEAR_PERSONAL_DATA,
  };
};
