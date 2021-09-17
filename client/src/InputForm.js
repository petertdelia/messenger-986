import {
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  username: {
    fontSize: theme.typography.fontSize
  },
  password: {
    fontSize: theme.typography.passwordFontSize
  }
}))

const InputForm = (props) => {
  const classes = useStyles();
  const forgot = props.forgot;

  const endAdornment = () => {
    return forgot ? (
      <InputAdornment position="end" color="primary">
        <Button color="primary" size="small">
          <Typography variant="subtitle1">Forgot?</Typography>
        </Button>
      </InputAdornment>
    ) : null;
  }

  return (
    <>
      <Typography variant="subtitle1" color="secondary">{props.name}</Typography>
      <FormControl fullWidth="true" required>
        <TextField
          aria-label={props.type === "email" ? "e-mail address" : props.type}
          name={props.type}
          type={props.type}
          InputProps={props.type !== "password" ? {
            className: classes.username,
          } :
          {
            className: classes.password,
            endAdornment: endAdornment()
          }}
        />
      </FormControl>
    </>
  )
}

export default InputForm;