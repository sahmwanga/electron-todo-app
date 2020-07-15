const db = require('../models');

// console.log(db);

const addUser = (User) => {
  return db.Users.create(User);
};

const listUser = async () => {
  const data = await db.Users.findAll({ raw: true });
  return data;
};

const deleteAllUser = async () => {
  return await db.Users.destroy({ where: {}, truncate: true });
};

const deleteById = async (UserId) => {
  return await db.Users.destroy({ where: { id: UserId } });
};

module.exports = { addUser, listUser, deleteAllUser, deleteById };
