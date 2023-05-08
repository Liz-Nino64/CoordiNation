const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const User = require('./User');

class Task extends Model {
  static getAllTasks() {
    return Task.findAll({
      include: {
        model: User,
        attributes: ['name'],
      },
      attributes: ['id', 'taskname', 'status', 'priority'],
    });
  }
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    taskname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;
