const { ipcRenderer } = window;
const { auth } = require('../shared/constants');

export const login = (payload) => {
  ipcRenderer
    .invoke(auth.USER_LOGIN, payload)
    .then((result) => {
      if (result) {
        saveToken();
      } else {
      }
      console.log(result);
    })
    .catch((error) => console.log(error));
};

export const getToken = () => {
  const username = localStorage.getItem('username');
  console.log(username);
  return username;
};

export const saveToken = () => {
  localStorage.setItem('username', 'admin');
};

export const clearToken = () => {
  localStorage.clear();
  window.location.replace(process.env.REACT_APP_AUTH_REDIRECT_URL);
};

export const isValidUser = () => {
  if (getToken()) {
    return true;
  }
  return false;
};
