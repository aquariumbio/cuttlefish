import * as actionTypes from 'src/actions';

const initialState = {
  loggedIn: false,
  user: {
    first_name: 'First',
    last_name: 'Last',
    username: '',
    password: '',
    email: '',
    avatar: '',
    bio: 'Position',
    role: '' // ['GUEST', 'USER', 'ADMIN']
  },
  currentProject: {
    type: 'Protein Design'
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      localStorage.setItem('user', {
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
      });
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
      localStorage.removeItem('user');
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
