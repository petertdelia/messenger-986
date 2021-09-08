import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  SvgIcon,
  Typography,
  Button,
  FormControl,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import bigImage from "./assets/images/bg-img.png";
import { ReactComponent as BubbleIcon } from "./assets/images/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    // width: "100vh"
  },
  imageBox: {
    flex: 2,
    backgroundImage: `linear-gradient(rgba(58,141,255,.75), #6CC1FF), url(${bigImage}) `,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    flex: 3,
    flexDirection: "column"
  },
  icon: {
    // width: "100%",
    fontSize: 60,
    marginBottom: 35
    // alignSelf: "center"
    // height: "50%"
  },
  leftText: {
    color: "white",
    fontSize: 20
    // marginBottom: 15
    // width: "100%",
    // alignSelf: "center"
  },
  loginForm: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, login } = props;

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
    
    <Grid container component="main" className={classes.root} justifyContent="center">
      <CssBaseline />
      <Grid container justifyContent="center" item className={classes.imageBox} >
        <SvgIcon className={classes.icon} component={BubbleIcon} viewBox="0 0 67 67"></SvgIcon>
        <Typography className={classes.leftText}>Converse with anyone</Typography> 
        <Typography className={classes.leftText}>with any language</Typography>
        <p style={{marginBottom: "60%"}}></p>
      </Grid>
      <Grid container item className={classes.form}>
        <Grid container item style={{justifyContent: "flex-end", alignItems: "center", flex: 1}}>
          <Typography>Don't have an account?</Typography>
          <Button onClick={() => history.push("/register")}>Create account</Button>
        </Grid>
        <form onSubmit={handleLogin} style={{display: "flex", justifyContent: "center", width: "100%", flex: 10}}>
          <Grid container className={classes.loginForm}>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Grid>
              <Button type="submit" variant="contained" size="large">
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
