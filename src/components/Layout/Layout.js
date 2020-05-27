import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import SideDrawer from "../UI/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../UI/Navigation/Toolbar/Toolbar";
import * as actionCreators from "../../store/actions/index";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const [ShowSideDrawer, setShowSideDrawer] = useState(false);
  const {
    onInitialAuth,
    onInitialPersonalData,
    isAuthenticated,
    token,
    userId,
  } = props;

  useEffect(() => {
    onInitialAuth();
    if (isAuthenticated) {
      onInitialPersonalData(token, userId);
    }
  }, [onInitialPersonalData, onInitialAuth, isAuthenticated, token, userId]);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes.Layout}>
      <nav>
        <Toolbar
          isAuth={props.isAuthenticated}
          firstName={props.firstName}
          gender={props.gender}
          loading={props.loading}
          error={props.error}
          drawerToogleClicked={sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          firstName={props.firstName}
          gender={props.gender}
          loading={props.loading}
          error={props.error}
          open={ShowSideDrawer}
          closed={sideDrawerClosedHandler}
        />
      </nav>
      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
    firstName: state.person.firstName,
    gender: state.person.gender,
    loading: state.person.loading,
    error: state.person.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitialAuth: () => dispatch(actionCreators.autoLogin()),
    onInitialPersonalData: (token, userId) =>
      dispatch(actionCreators.fetchPersonalData(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
