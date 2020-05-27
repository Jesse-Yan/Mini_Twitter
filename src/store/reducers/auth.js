import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  firstLoginLoading: false,
  error: null,
  firstLogin: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const authPersonalData = (state, action) => {
  return updateObject(state, { firstLoginLoading: true });
};

const authPersonalDataSaga = (state, action) => {
  return updateObject(state, { firstLogin: true, firstLoginLoading: false });
};

const confirmFirstLogin = (state, action) => {
  return updateObject(state, { firstLogin: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_AUTH_SAGA:
      return authStart(state, action);
    case actionTypes.START_AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.START_AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.INIT_LOGOUT_SAGA:
      return authLogout(state, action);
    case actionTypes.PERSONAL_DATA_AUTH:
      return authPersonalData(state, action);
    case actionTypes.PERSONAL_DATA_AUTH_SAGA:
      return authPersonalDataSaga(state, action);
    case actionTypes.CONFIRM_FIRST_LOGIN:
      return confirmFirstLogin(state, action);
    default:
      return state;
  }
};

export default reducer;
