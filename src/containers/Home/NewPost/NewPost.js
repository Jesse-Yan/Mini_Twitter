import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import axiosTweet from "../../../axios-mini-tweet";

import * as actionCreators from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import classes from "./NewPost.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

const NewPost = (props) => {
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = (data) => {
    clearNewPostHandler();
    props.onSubmitNewPost({
      text: data.textField,
      date: new Date().getTime(),
      token: props.token,
      userId: props.userId,
      firstName: props.firstName,
      gender: props.gender,
    });
  };

  const clearNewPostHandler = () => {
    reset({
      textField: "",
    });
  };

  let title = (
    <p>
      <strong>Please Login to start your new post</strong>
    </p>
  );

  if (props.isAuth) {
    title = (
      <Fragment>
        <p>
          <strong>Welcome to mini-tweet, {props.userName}</strong>
        </p>
        <p>
          <strong>Please start your new post</strong>
        </p>
      </Fragment>
    );
  }
  return (
    <div className={classes.NewPost}>
      {title}
      <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          disabled={!props.isAuth}
          multiline
          rows="10"
          margin="dense"
          fullWidth
          placeholder="What's up?"
          variant="outlined"
          required
          name="textField"
          control={control}
          defaultValue=""
        />
        <div>
          <Button
            type="submit"
            disabled={!props.isAuth}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!props.isAuth}
            onClick={clearNewPostHandler}
          >
            Reset
          </Button>
        </div>
        {props.loading && <Spinner />}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
    firstName: state.person.firstName,
    gender: state.person.gender,
    loading: state.pos.newPostLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitNewPost: (data) => dispatch(actionCreators.startNewPost(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(React.memo(NewPost), axiosTweet));
