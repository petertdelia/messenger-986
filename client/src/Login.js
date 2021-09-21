import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import ConverseBackground from "./ConverseBackground";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LoginSignupButtons from "./LoginSignupButtons";
import InputForm from "./InputForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  mobile: {
    flexDirection: "column",
  },
  form: {
    flex: 3,
    flexDirection: "column"
  },
  loginGrid: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  loginForm: {
    display: "flex", 
    justifyContent: "space-around", 
    width: "100%", 
    flex: 20
  },
  signupButton: {
    boxShadow: "1px -1px 13px 3px #C9C9C9",
    margin: "5% 5%",
    width: "30%",
    height: "60%",
    borderRadius: "5px",
  },
  formSpacing: {
    margin: "3vh 10vw",
    fontSize: ".7em"
  },
  welcomeBack: {
    fontSize: "1.75em",
    fontWeight: "bold",
    marginTop: "3vh",
    marginBottom: "0"
  },
  loginButtonBox: {
    alignSelf: "center",
    marginTop: "3vh",
    marginBottom: "10vh",
  },
  loginButton: {
    height: "4vw", 
    width: "22vh",
    fontSize: ".9em"
  },
  mobileButton: {
    height: "14vw", 
    width: "22vh",
    fontSize: ".9em"
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const { user, login } = props;
  const isWideScreen = useMediaQuery('(min-width:600px)');

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={isWideScreen ? classes.root : classes.mobile} justifyContent="center">
      {isWideScreen && <ConverseBackground />}
      <Grid container item className={classes.form}>
        <LoginSignupButtons leftText="Don't have an account?" buttonText="Create account" type="register" />
          <form onSubmit={handleLogin} className={classes.loginForm}>
            <Grid container className={classes.loginGrid}>
              <Typography className={`${classes.formSpacing} ${classes.welcomeBack}`} >Welcome back!</Typography>
              <Grid className={classes.formSpacing}>
                <InputForm type="username" name="Username"/>
              </Grid>
              <Grid className={classes.formSpacing}>
                <InputForm type="password" name="Password" forgot="true"/>
              </Grid>
              <Grid className={classes.loginButtonBox}>
                <Button className={isWideScreen ? classes.loginButton : classes.mobileButton} size="large" type="submit" color="primary" variant="contained">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
