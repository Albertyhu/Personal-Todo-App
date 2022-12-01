export const LogOut = (dispatch) => {
  dispatch(null);
  localStorage.setItem('token', null);
};
