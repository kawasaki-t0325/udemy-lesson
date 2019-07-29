import React, { Component } from 'react';
import History from 'history';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Authentication } from '../modules';
import { ValidationUtil } from '../utils';
import { PATH } from '../config';
import { DefaultInput } from '../components';

const styles = createStyles((theme: Theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    width: '100%',
    position: 'relative',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -12,
  },
  message: {
    padding: 10,
    backgroundColor: '#ffebee',
    color: '#d50000',
  },
}));

interface IProps extends WithStyles {
  history: History.History,
}

interface IState {
  info: {
    email: string,
    password: string,
  },
  error: {
    email: string,
    password: string,
  },
  loading: boolean,
  message: string,
}


class Login extends Component<IProps, IState> {
  state = {
    info: {
      email: '',
      password: '',
    },
    error: {
      email: '',
      password: '',
    },
    loading: false,
    message: '',
  };

  signupWithEmail = async () => {
    const { info } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });

    const result = await Authentication.signinWithEmail(info.email, info.password);
    if (result.uid) {
      history.push(PATH.TOP);
      return;
    }

    this.setState({ loading: false, message: result.error });
  };

  canSubmit = () => {
    const { info, error, loading } = this.state;

    const allowInfo = Object.values(info).filter(value => {
      return value === '';
    }).length === 0;
    const allowError = Object.values(error).filter(value => {
      return value !== '';
    }).length === 0;

    return !allowInfo || !allowError || loading;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const type = event.target.type;
    const value = event.target.value;
    const { info, error } = this.state;

    this.setState({
      info: { ...info, [key]: value },
    });
    this.setState({
      error: { ...error, [key]: ValidationUtil.formValidate(type, value) },
    });
  };

  render() {
    const { classes } = this.props;
    const { info, error, loading, message } = this.state;

    const emailAndPassword = [
      {
        id: "email",
        label: "Email Address",
        name: "email",
        type: "email",
        autoComplete: "email",
        value: info.email,
        handleChange: this.handleChange,
        message: error.email,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        id: "password",
        autoComplete: "current-password",
        value: info.password,
        handleChange: this.handleChange,
        message: error.password,
      },
    ];

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
          {message && <Typography className={classes.message}>{message}</Typography>}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Grid container spacing={2} className={classes.submit}>
            {emailAndPassword.map((item, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <DefaultInput
                    autoComplete={item.autoComplete}
                    type={item.type}
                    name={item.name}
                    id={item.id}
                    label={item.label}
                    value={item.value}
                    handleChange={item.handleChange}
                    message={item.message}
                  />
                </Grid>
              );
            })}

          </Grid>
          <div className={classes.button}>
            <Button
              disabled={this.canSubmit()}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.signupWithEmail()}
            >
              Sign In
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={classes.progress}
              />
            )}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                ユーザーアカウントが無い方はこちら
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);