const db = require('../models');

// console.log(db);

const addTask = (task) => {
  return db.Tasks.create(task);
};

const listTask = async () => {
  const data = await db.Tasks.findAll({ raw: true });
  return data;
};

module.exports = { addTask, listTask };
