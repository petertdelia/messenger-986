import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  form: {
    flex: 3,
    flexDirection: "column"
  },
  signupButton: {
    boxShadow: "1px -1px 5px 2px #C9C9C9",
    margin: "5% 5%",
    width: "13vw",
    height: "9vh",
    borderRadius: "5px",
  },
  mobileButton: {
    boxShadow: "1px -1px 5px 2px #C9C9C9",
    margin: "5% 5%",
    width: "30vw",
    height: "9vh",
    borderRadius: "5px",
  }
}));

const LoginSignupButtons = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { leftText, buttonText, type } = props;
  const isWideScreen = useMediaQuery('(min-width:600px)');


  return (
    <Grid container item style={{justifyContent: "flex-end", alignItems: "center", flex: 1}}>
      <Typography color="secondary" variant="subtitle1">{leftText}</Typography>
      <Button className={isWideScreen ? classes.signupButton : classes.mobileButton} color="primary" onClick={() => history.push(`/${type}`)}>
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
