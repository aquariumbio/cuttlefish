import * as actionTypes from 'src/actions';

const initialState = {
  loggedIn: true,
  user: {
    first_name: 'First',
    last_name: 'Last',
    email: 'email@mail.com',
    avatar: '',
    bio: 'Position',
    role: 'ADMIN' // ['GUEST', 'USER', 'ADMIN']
  },
  currentProject: {
    type: 'Protein Design'
  },
  currentLibraries: []
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState
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

    case actionTypes.SET_LIBRARIES: {
      return {
        ...state,
        currentLibraries: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
