export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const GET_PROJECT = 'GET_PROJECT';
export const SET_LIBRARIES = 'SET_LIBRARIES';
export const PROTEIN = 'PROTEIN';
export const STRAIN = 'STRAIN';

export const login = () => dispatch =>
  dispatch({
    type: SESSION_LOGIN
  });

export const logout = () => dispatch =>
  dispatch({
    type: SESSION_LOGOUT
  });

export const getProject = project => dispatch =>
  dispatch({
    type: GET_PROJECT,
    payload: project
  });

export const setCurrentLibraries = libraries => dispatch =>
  dispatch({
    type: SET_LIBRARIES,
    payload: libraries
  });
