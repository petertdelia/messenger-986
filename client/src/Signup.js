import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Button
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import ConverseBackground from "./ConverseBackground";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LoginSignupButtons from "./LoginSignupButtons";
import InputForm from "./InputForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    boxSizing: "border-box"
  },
  mobileRoot: {
    flexDirection: "column",
    
  },
  form: {
    flex: 3,
    flexDirection: "column",
  },
  signupGrid: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  signupForm: {
    display: "flex", 
    justifyContent: "space-around", 
    width: "100%", 
    flex: 10
  },
  loginButton: {
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
  createAccount: {
    fontSize: "1.75em",
    fontWeight: "bold",
    marginTop: "10vh",
    marginLeft: "10vw"
  },
  signupButtonBox: {
    alignSelf: "center",
    marginTop: "3vh",
    marginBottom: "10vh",
  },
  signupButton: {
    height: "4vw", 
    width: "22vh",
    fontSize: ".9em",
  },
  mobileButton: {
    height: "14vw", 
    width: "22vh",
    fontSize: ".9em"
  }
}));

const Signup = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const isWideScreen = useMediaQuery('(min-width:600px)');

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={isWideScreen ? classes.root : classes.mobileRoot} justifyContent="center">
      {isWideScreen && <ConverseBackground />}
      <Grid container item className={classes.form}>
      <LoginSignupButtons leftText="Already have an account?" buttonText="Login" type="login" />
        <form onSubmit={handleRegister} className={classes.signupForm}>
          <Grid container className={classes.signupGrid}>
            <Typography className={classes.createAccount} >Create an account.</Typography>
            <Grid className={classes.formSpacing}>
              <InputForm type="username" name="Username"/>
            </Grid>
            <Grid className={classes.formSpacing}>
              <InputForm type="email" name="E-mail address"/>
            </Grid>
            <Grid className={classes.formSpacing}>
              <InputForm type="password" name="Password"/>
            </Grid>
            <Grid className={classes.signupButtonBox}>
              <Button className={isWideScreen ? classes.signupButton : classes.mobileButton} size="large" type="submit" color="primary" variant="contained">
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
