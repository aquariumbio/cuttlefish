import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import { login } from 'src/actions';
import firebase from '../../firebase/firebase';
import Alert from '@material-ui/lab/Alert';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%',
    '&:hover': {
      backgroundColor: '#065683'
    }
  },
  alertBox: {
    marginBottom: theme.spacing(2)
  }
}));

function LoginForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  let alertBox

  const handleChange = event => {
    event.persist();
    setShowError(false)

    setFormState(prevFormState => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true
      }
    }));
  };

  // Logs user in, setting localstorage to maintain session state
  const loginWithFirebase = () => {
    firebase.db
      .collection('users')
      .where('aqPassword', '==', formState.values.password)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          dispatch(
            login({
              username: doc.data().aqLogin,
              password: formState.values.password,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email
            })
          );
          localStorage.setItem('User', JSON.stringify(doc.data()));
          history.push('/')
        });
      })
  };

  // Show alert box for error login
  if (showError) {
    alertBox = <Alert className={classes.alertBox} severity="error">{errorMessage}</Alert>
  }

  // Currently retrieves user information from firebase and sets it to local storage
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      firebase.login(formState.values.email, formState.values.password).catch(function (error) {
        var errorCode = error.code;
        var errorMsg = error.message;
        if (errorCode === 'auth/wrong-password') {
          history.push('/auth/login')
          setErrorMessage("Invalid Username or Password")
          setShowError(true)
        } else {
          history.push('/auth/login')
          setErrorMessage(errorMsg)
          setShowError(true)
        }
      })
        .then(
          loginWithFirebase(),
        )
    } catch (err) {
      history.push('/auth/login')
      setErrorMessage(err.message)
      setShowError(true)
    }
  };

  const hasError = field =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(prevFormState => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      {alertBox}
      <div className={classes.fields}>
        <TextField
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="primary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Sign in
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;