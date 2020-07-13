const { ipcRenderer } = window;
const { auth } = require('../shared/constants');

export const login = (payload) => {
  ipcRenderer.send(auth.USER_LOGIN, payload);
};

export const getToken = () => {};

export const isValidUser = () => {
  return true;
  const token = getToken();
  if (token) {
    return true;
  }
  return false;
};
