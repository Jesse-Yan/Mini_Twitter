import React from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, Transition } from "react-transition-group";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import classes from "./App.module.css";
import MyPosts from "./containers/MyPosts/MyPosts";

const App = (props) => {
  return (
    <div className={classes.App}>
      <Layout>
        <Route
          render={({ location }) => {
            const { key } = location;

            const duration = 500;

            const defaultStyle = {
              transition: `opacity ${duration}ms ease-in-out`,
              opacity: 0,
            };

            const transitionStyles = {
              entering: { opacity: 0 },
              entered: { opacity: 1 },
              exiting: { opacity: 1 },
              exited: { opacity: 0 },
            };

            return (
              <TransitionGroup component={null}>
                <Transition key={key} timeout={duration}>
                  {(state) => (
                    <div
                      style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }}
                    >
                      <Switch location={location}>
                        <Route path="/auth" component={Auth} />
                        <Route path="/logout" component={Logout} />
                        {props.isAuth && (
                          <Route path="/myposts" component={MyPosts} />
                        )}
                        <Route path="/" component={Home} />
                      </Switch>
                    </div>
                  )}
                </Transition>
              </TransitionGroup>
            );
          }}
        />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(App);
