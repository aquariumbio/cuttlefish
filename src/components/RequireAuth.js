import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../views/Login';

export function RequireAuth(Component) {
  return class AuthenticatedComponent extends React.Component {
    /**
     * Check if the user is authenticated, this.props.isAuthenticated
     * has to be set from your application logic (or use react-redux to retrieve it from global state).
     */
    isAuthenticated() {
      return localStorage.getItem('User') != null;
    }

    /**
     * Render
     */
    render() {
      return (
        <div>
          {this.isAuthenticated === true ? (
            <Component {...this.props} />
          ) : (
            <Login />
          )}
        </div>
      );
    }
  };
}

export default RequireAuth;
