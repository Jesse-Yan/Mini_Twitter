import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../shared/utility";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  loading: false,
  error: null,
};

const startFetchPersonalData = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const afterfetchPersonalDataSuccess = (state, action) => {
  return updateObject(state, {
    firstName: action.data.firstName,
    lastName: action.data.lastName,
    gender: action.data.gender,
    loading: false,
    error: null,
  });
};

const afterfetchPersonalDataFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PERSONAL_DATA:
      return startFetchPersonalData(state, action);
    case actionTypes.FETCH_PERSONAL_DATA_SUCCESS:
      return afterfetchPersonalDataSuccess(state, action);
    case actionTypes.FETCH_PERSONAL_DATA_FAIL:
      return afterfetchPersonalDataFail(state, action);
    case actionTypes.CLEAR_PERSONAL_DATA:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
