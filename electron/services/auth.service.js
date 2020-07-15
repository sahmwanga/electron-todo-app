const db = require('../models');

// console.log(db);

const login = ({ username, password }) => {
  if (username == 'admin' && password === 'admin') {
    // return db.Users.find({ username, password });
    return Promise.resolve(true);
  }
  return Promise.reject(false);
};

module.exports = { login };
