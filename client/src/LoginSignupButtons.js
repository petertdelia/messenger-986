import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    flex: 3,
    flexDirection: "column"
  },
  signupButton: {
    boxShadow: "1px -1px 13px 3px #C9C9C9",
    margin: "5% 5%",
    width: "30%",
    height: "60%",
    borderRadius: "5px",
  },
}));

const LoginSignupButtons = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { leftText, buttonText, type } = props;



  return (
    <Grid container item style={{justifyContent: "flex-end", alignItems: "center", flex: 1}}>
      <Typography color="secondary" variant="subtitle1">{leftText}</Typography>
      <Button className={classes.signupButton} color="primary" onClick={() => history.push(`/${type}`)}>
        <Typography variant="subtitle1">{buttonText}</Typography>
      </Button>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(LoginSignupButtons);
