const sequelize = require('../config/connection');
const { User, Task } = require('../models/index');


const userData = require('./userData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Task.bulkCreate(taskData, {
  });

  process.exit(0);
};

seedDatabase();

Task.getAllTasks()
  .then(tasks => {
    console.log(tasks);
  })
  .catch(err => {
    console.log(err);
  });
