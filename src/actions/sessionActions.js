export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const GET_PROJECT = 'GET_PROJECT';
export const PROTEIN = 'PROTEIN';
export const STRAIN = 'STRAIN';

export const login = user => dispatch =>
  dispatch({
    type: SESSION_LOGIN,
    payload: user
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
