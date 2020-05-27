import React, { useEffect } from "react";
import { connect } from "react-redux";
import axiosTweet from "../../../axios-mini-tweet";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Scrollbars } from "react-custom-scrollbars";

import Post from "../../../components/Post/Post";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../../store/actions/index";
import classes from "./Posts.module.css";

const Posts = (props) => {
  const { fetchPosts } = props;

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  let content = <Spinner />;

  if (props.posts && !props.loading) {
    content = (
      <TransitionGroup component={null}>
        {props.posts.map((post, index) => (
          <CSSTransition
            key={index}
            timeout={500}
            appear
            classNames={{
              appear: classes.FadeEnter,
              appearActive: classes.FadeEnterActive,
            }}
          >
            <Post
              name={post.firstName}
              gender={post.gender}
              date={new Date(post.date).toLocaleString()}
              content={post.text}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }

  return (
    <Scrollbars className={classes.Posts} autoHide>
      {content}
    </Scrollbars>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.pos.posts,
    loading: state.pos.fetchLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(actionCreators.fetchPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(React.memo(Posts), axiosTweet));
