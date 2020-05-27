import React, { Fragment } from "react";
import { CSSTransition } from "react-transition-group";

import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import useHttpErrorHandler from "../../hooks/http-error-handler";
import classes from "./withErrorHandler.module.css";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);
    return (
      <Fragment>
        <CSSTransition
          in={Boolean(error)}
          timeout={500}
          mountOnEnter
          unmountOnExit
          classNames={{
            appearActive: classes.CloseErrorModal,
            enter: classes.OpenErrorModal,
            exit: classes.CloseErrorModal,
          }}
        >
          <ErrorModal onClose={errorConfirmedHandler}>
            {error && error.message}
          </ErrorModal>
        </CSSTransition>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
