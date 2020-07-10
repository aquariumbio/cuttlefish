import * as actionTypes from 'src/actions';

const initialState = {
  loggedIn: localStorage.getItem('User') != null,
  user: JSON.parse(localStorage.getItem('User')),
  currentProject: {
    type: 'Protein Design'
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...state,
        loggedIn: true,
        user: {
          ...state.user,
          username: action.payload.username,
          password: action.payload.password,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          role: 'USER'
        }
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST'
        }
      };
    }

    case actionTypes.GET_PROJECT: {
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
