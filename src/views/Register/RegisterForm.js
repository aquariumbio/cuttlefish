import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Tooltip,
  Zoom
} from '@material-ui/core';
import { login } from 'src/actions';
import { useDispatch } from 'react-redux';
import firebase from '../../firebase/firebase';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
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
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%',
    '&:hover': {
      backgroundColor: '#065683'
    }
  }
}));

const CustomTooltip = withStyles({
  tooltip: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 12,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
  }
})(Tooltip);

function RegisterForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleChange = event => {
    event.persist();

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
  // const registerWithFirebase = () => {
  //   firebase.db
  //     .collection('users')
  //     .where('aqPassword', '==', formState.values.password)
  //     .get()
  //     .then(function(querySnapshot) {
  //       if (querySnapshot.empty) {
  //         alert('No such user exists');
  //       }
  //       querySnapshot.forEach(function(doc) {
  //         dispatch(
  //           login({
  //             username: doc.data().aqLogin,
  //             password: formState.values.password,
  //             firstName: doc.data().firstName,
  //             lastName: doc.data().lastName,
  //             email: doc.data().email
  //           })
  //         );
  //         localStorage.setItem('User', JSON.stringify(doc.data()));
  //       });
  //     })
  //     .then(() => {
  //       history.push('/');
  //     })
  //     .catch(error => {
  //       console.log('Error getting user', error);
  //     });
  // };

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formState.values.username,
        password: formState.values.password
      })
    });
    if (response.status === 200) {
      await firebase.register(
        formState.values.username,
        formState.values.email,
        formState.values.password
      );
      firebase.db
        .collection('users')
        .doc(formState.values.username)
        .set({
          aqPassword: formState.values.password,
          aqLogin: formState.values.username,
          firstName: formState.values.firstName,
          lastName: formState.values.lastName,
          email: formState.values.email,
          favoritePlans: []
        })
        .then(() => {
          const newUser = {
            aqPassword: formState.values.password,
            aqLogin: formState.values.username,
            firstName: formState.values.firstName,
            lastName: formState.values.lastName,
            email: formState.values.email,
            favoritePlans: []
          };
          localStorage.setItem('User', JSON.stringify(newUser));
          dispatch(login(newUser));
        })
        .then(() => {
          history.push('/');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    } else {
      alert('Invalid aquraium credentials');
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
      <div className={classes.fields}>
        <CustomTooltip TransitionComponent={Zoom} title="Your First Name">
          <TextField
            error={hasError('firstName')}
            helperText={
              hasError('firstName') ? formState.errors.firstName[0] : null
            }
            label="First name"
            name="firstName"
            onChange={handleChange}
            value={formState.values.firstName || ''}
            variant="outlined"
          />
        </CustomTooltip>

        <CustomTooltip TransitionComponent={Zoom} title="Your Last Name">
          <TextField
            error={hasError('lastName')}
            helperText={
              hasError('lastName') ? formState.errors.lastName[0] : null
            }
            label="Last name"
            name="lastName"
            onChange={handleChange}
            value={formState.values.lastName || ''}
            variant="outlined"
          />
        </CustomTooltip>

        <CustomTooltip TransitionComponent={Zoom} title="Your Email address">
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
        </CustomTooltip>

        <CustomTooltip TransitionComponent={Zoom} title="Username of your Aquarium account">
          <TextField
            error={hasError('username')}
            fullWidth
            helperText={
              hasError('username') ? formState.errors.username[0] : null
            }
            label="Aquarium login"
            name="username"
            onChange={handleChange}
            value={formState.values.username || ''}
            variant="outlined"
          />
        </CustomTooltip>

        <CustomTooltip TransitionComponent={Zoom} title="Password of your Aquarium account">
          <TextField
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="Aquarium password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
        </CustomTooltip>
      </div>
      <Button
        className={classes.submitButton}
        color="primary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Sign Up
      </Button>
    </form>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string
};

export default RegisterForm;
