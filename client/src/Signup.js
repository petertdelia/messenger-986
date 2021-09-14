import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import ConverseBackground from "./ConverseBackground";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    boxSizing: "border-box"
  },
  form: {
    flex: 3,
    flexDirection: "column"
  },
  signupGrid: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  signupForm: {
    display: "flex", 
    justifyContent: "space-around", 
    maxHeight: "100%",
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
    height: "5vw", 
    width: "22vh",
    fontSize: ".9em",
  }
}));

const Signup = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

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
    <Grid container component="main" className={classes.root} justifyContent="center">
      <CssBaseline />
      <ConverseBackground />
      <Grid container item className={classes.form}>
        <Grid container item style={{justifyContent: "flex-end", alignItems: "center", flex: 1}}>
          <Typography color="secondary" variant="subtitle1">Already have an account?</Typography>
          <Button className={classes.loginButton} color="primary" onClick={() => history.push("/login")}>
            <Typography variant="subtitle1">Login</Typography>
          </Button>
        </Grid>
        <form onSubmit={handleRegister} className={classes.signupForm}>
          <Grid container className={classes.signupGrid}>
            <Typography className={classes.createAccount} >Create an account.</Typography>
            <Grid className={classes.formSpacing}>
              <Typography variant="subtitle1" color="secondary">Username</Typography>
              <FormControl fullWidth="true" required>
                <TextField
                  aria-label="username"
                  name="username"
                  type="text"
                  InputProps={{
                    style: {fontSize: 14},
                  }}
                />
              </FormControl>
            </Grid>
            <Grid className={classes.formSpacing}>
              <Typography variant="subtitle1" color="secondary">E-mail address</Typography>
              <FormControl fullWidth="true" required>
                <TextField
                  aria-label="E-mail address"
                  name="email"
                  type="email"
                  InputProps={{
                    style: {fontSize: 14},
                  }}
                />
              </FormControl>
            </Grid>
            <Grid className={classes.formSpacing}>
              <Typography variant="subtitle1" color="secondary">Password</Typography>
              <FormControl fullWidth="true" required>
                <TextField
                  aria-label="password"
                  type="password"
                  name="password"
                  InputProps={{
                    style: {fontSize: 20},
                  }}
                />
              </FormControl>
            </Grid>
            <Grid className={classes.signupButtonBox}>
              <Button className={classes.signupButton} size="large" type="submit" color="primary" variant="contained">
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
