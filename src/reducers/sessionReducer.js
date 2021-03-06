import * as actionTypes from 'src/actions';

const initialState = {
  loggedIn: localStorage.getItem('User') != null,
  user: JSON.parse(localStorage.getItem('User')),
  currentProject: JSON.parse(localStorage.getItem('currentProject'))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...state,
        loggedIn: true,
        user: {
          ...state.user,
          aqLogin: action.payload.aqLogin,
          aqPassword: action.payload.aqPassword,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email
          // role: 'USER'
        }
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          // role: 'GUEST'
        }
      };
    }

    case actionTypes.GET_PROJECT: {
      localStorage.setItem('currentProject', JSON.stringify(action.payload));

      return {
        ...state,
        currentProject: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
