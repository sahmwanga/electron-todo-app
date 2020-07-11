const db = require('../models');

// console.log(db);

const addTask = (task) => {
  return db.Tasks.create(task);
};

const listTask = async () => {
  const data = await db.Tasks.findAll({ raw: true });
  return data;
};

const deleteAllTask = async () => {
  return await db.Tasks.destroy({ where: {}, truncate: true });
};

const deleteById = async (taskId) => {
  return await db.Tasks.destroy({ where: { id: taskId } });
};

module.exports = { addTask, listTask, deleteAllTask, deleteById };
