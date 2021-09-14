import React from "react";
import {
  Grid,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bigImage from "./assets/images/bg-img.png";
import { ReactComponent as BubbleIcon } from "./assets/images/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  imageBox: {
    flex: 2,
    backgroundImage: `linear-gradient(rgba(58,141,255,.75), #6CC1FF), url(${bigImage}) `,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    flexDirection: "column",
    alignItems: "center",
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
    marginBottom: "50%"
  }
}));

const ConverseBackground = (props) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" item className={classes.imageBox} >
    <SvgIcon className={classes.icon} component={BubbleIcon} viewBox="0 0 67 67"></SvgIcon>
    <Typography className={classes.leftText}>Converse with anyone</Typography> 
    <Typography className={classes.leftTextBottom}>with any language</Typography>
  </Grid>
  )
}

export default ConverseBackground;