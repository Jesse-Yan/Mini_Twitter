import React, { useEffect } from "react";
import { connect } from "react-redux";
import axiosTweet from "../../axios-mini-tweet";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Post from "../../components/Post/Post";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/index";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
  const { fetchPosts, userId } = props;

  useEffect(() => {
    fetchPosts(userId);
  }, [fetchPosts, userId]);

  let content = <Spinner />;

  if (props.posts && !props.loading) {
    if (props.posts.length !== 0) {
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
                name="You"
                gender={post.gender}
                date={new Date(post.date).toLocaleString()}
                content={post.text}
                myPosts
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      );
    }
  }

  return <div className={classes.MyPosts}>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    posts: state.pos.myPosts,
    loading: state.pos.fetchLoading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (userId) => dispatch(actionCreators.fetchMyPosts(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(React.memo(MyPosts), axiosTweet));
