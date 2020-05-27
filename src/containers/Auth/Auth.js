import React, { useState, Fragment } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import axiosTweet from "../../axios-mini-tweet";
import { Redirect } from "react-router-dom";

import * as actionCreators from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";

import CheckIcon from "../../components/UI/CheckIcon/CheckIcon";

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Undefined", label: "Rather not to say" },
];

const Auth = (props) => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    if (isSignUp) {
      props.onSubmitHandler({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender.value,
        email: data.email,
        password: data.password,
        isSignUp: isSignUp,
      });
    } else {
      props.onSubmitHandler({
        email: data.email,
        password: data.password,
        isSignUp: isSignUp,
      });
    }
  };
  const [isSignUp, setIsSignUp] = useState(true);

  const signUpChangeHandler = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  let signUp = null;
  if (isSignUp) {
    signUp = (
      <Fragment>
        <Controller
          as={TextField}
          placeholder="Your firstName here"
          inputProps={{
            maxLength: 20,
            pattern: "^[A-Za-z]+$",
          }}
          required
          name="firstName"
          control={control}
          defaultValue=""
        />
        <br />
        <Controller
          as={TextField}
          placeholder="Your lastName here"
          inputProps={{
            maxLength: 20,
            pattern: "^[A-Za-z]+$",
          }}
          required
          name="lastName"
          control={control}
          defaultValue=""
        />
        <br />
        <Controller
          as={<Select options={options} />}
          required
          name="gender"
          control={control}
          defaultValue={{ value: "Male", label: "Male" }}
        />
        <br />
      </Fragment>
    );
  }

  let mainForm = (
    <Fragment>
      <CheckIcon />
      <Button
        color="primary"
        variant="contained"
        onClick={props.onConfirmFirstLogin}
      >
        CONFIRM
      </Button>
    </Fragment>
  );

  if (!props.isFirstLogin && !props.isFirstLoginLoading) {
    mainForm = (
      <Fragment>
        {props.isAuth && <Redirect to="/" />}
        {props.error && <p>{props.error.message}</p>}
        {props.loading ? (
          <Spinner />
        ) : (
          <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
            {signUp}
            <Controller
              as={TextField}
              placeholder="Your Email here"
              type="email"
              inputProps={{
                title: "Please enter the correct email",
                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
              }}
              required
              name="email"
              control={control}
              defaultValue=""
            />
            <br />
            <Controller
              as={TextField}
              placeholder="Your Password here"
              type="password"
              inputProps={{
                title:
                  "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}",
              }}
              required
              name="password"
              control={control}
              defaultValue=""
            />
            <br />
            <Button type="submit" color="secondary" variant="contained">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            <br />
            <Button
              color="primary"
              variant="outlined"
              onClick={signUpChangeHandler}
            >
              Switch To {isSignUp ? "Login" : "Sign Up"}
            </Button>
            <br />
          </form>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className={classes.Auth}>
        <div className={classes.AuthCard}>
          <p>
            <strong>Welcome To Mini-Tweet</strong>
          </p>
          {mainForm}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToPorps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuth: state.auth.token,
    isFirstLogin: state.auth.firstLogin,
    isFirstLoginLoading: state.auth.firstLoginLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitHandler: (data) => dispatch(actionCreators.startAuth(data)),
    onConfirmFirstLogin: () => dispatch(actionCreators.userConfirmFirstLogin()),
  };
};

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(withErrorHandler(React.memo(Auth), axiosTweet));
