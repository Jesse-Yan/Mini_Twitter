import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import postsReducer from "./store/reducers/posts";
import authReducer from "./store/reducers/auth";
import personReducer from "./store/reducers/personalData";
import rootSaga from "./store/sagas/index";
import App from "./App";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  pos: postsReducer,
  auth: authReducer,
  person: personReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
