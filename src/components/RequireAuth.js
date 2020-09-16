import React from 'react';
import { Redirect } from 'react-router-dom';

export function RequireAuth(Component) {
  return class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isAuthenticated: localStorage.getItem('User') != null };
    }

    componentDidMount() {}

    render() {
      return (
        <div>
          {this.state.isAuthenticated ? (
            <Component {...this.props} />
          ) : (
            <Redirect to="/auth/login" />
          )}
        </div>
      );
    }
  };
}

export default RequireAuth;
