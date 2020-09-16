import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
//import firebase from '../firebase/firebase';

// Example of user roles: ['GUEST', 'USER', 'ADMIN'];

function AuthGuard({ roles, children }) {
  const session = useSelector(state => state.session);
  const history = useHistory();

  useEffect(() => {
    if (!session.loggedIn || !session.user) {
      history.push('/auth/login');
      return;
    }
    // if (!roles.includes(session.user.role)) {
    //   history.push('/errors/error-401');
    // }
  }, [history, roles, session.loggedIn, session.user]);

  // firebase.auth.onAuthStateChanged(user => {
  //   if (user) {
  //     history.push('/');
  //   } else {
  //     history.push('/auth/login');
  //   }
  // });

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node
  // roles: PropTypes.array.isRequired
};

export default AuthGuard;
