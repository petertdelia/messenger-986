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
  InputAdornment,
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
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    flex: 3,
    flexDirection: "column"
  },
  icon: {
    fontSize: 60,
    marginBottom: 35
  },
  leftText: {
    color: "white",
    fontSize: 20,
  },
  leftTextBottom: {
    color: "white",
    fontSize: 20,
    marginBottom: "75%"
  },
  loginGrid: {
    flexDirection: "column",
    // alignItems: "baseline",
    justifyContent: "space-around"
  },
  loginForm: {
    display: "flex", 
    justifyContent: "space-around", 
    width: "100%", 
    flex: 20
  },
  accountButton: {
    boxShadow: "1px -1px 13px 3px #C9C9C9",
    margin: "5% 5%",
    width: "30%",
    height: "60%",
    borderRadius: "5px",
  },
  formSpacing: {
    margin: "2% 20%",
    fontSize: ".7em"
  },
  welcomeBack: {
    fontSize: "1.75em",
    fontWeight: "bold",
    marginTop: "10%",
    marginBottom: "5%"
  },
  loginButtonBox: {
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: "25%",
  },
  loginButton: {
    height: "5vw", 
    width: "22vh",
    fontSize: ".9em"
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
        <Typography className={classes.leftTextBottom}>with any language</Typography>
      </Grid>
      <Grid container item className={classes.form}>
        <Grid container item style={{justifyContent: "flex-end", alignItems: "center", flex: 1}}>
          <Typography color="secondary" variant="subtitle1">Don't have an account?</Typography>
          <Button className={classes.accountButton} color="primary" onClick={() => history.push("/register")}>
            <Typography variant="subtitle1">Create account</Typography>
          </Button>
        </Grid>
        <form onSubmit={handleLogin} className={classes.loginForm}>
          <Grid container className={classes.loginGrid}>
            <Typography className={`${classes.formSpacing} ${classes.welcomeBack}`} >Welcome back!</Typography>
            <Grid className={classes.formSpacing}>
              <Typography variant="subtitle1" color="secondary">E-mail address</Typography>
              <FormControl fullWidth="true" margin="normal" required>
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
              <Typography variant="subtitle1" color="secondary">Password</Typography>
              <FormControl fullWidth="true" margin="normal" required>
                <TextField
                  aria-label="password"
                  type="password"
                  name="password"
                  InputProps={{
                    style: {fontSize: 20},
                    endAdornment: 
                    <InputAdornment position="end" color="primary">
                      <Button color="primary" size="small">
                        <Typography variant="subtitle1">Forgot?</Typography>
                      </Button>
                    </InputAdornment>
                  }}
                />
              
              </FormControl>
            </Grid>
            <Grid className={classes.loginButtonBox}>
              <Button className={classes.loginButton} size="large" type="submit" color="primary" variant="contained">
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
