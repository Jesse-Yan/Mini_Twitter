import React, { Fragment } from "react";

import classes from "./Title.module.css";
import Spinner from "../../Spinner/Spinner";

const Title = (props) => (
  <Fragment>
    {props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.Title}>
        {props.name && <p>Welcome, {props.name}!</p>}
      </div>
    )}
  </Fragment>
);

export default Title;
