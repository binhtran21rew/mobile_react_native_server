// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// const User = require('./userModel');

// const Todo = sequelize.define(
//     'Todo',
//     {
//         text: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         date: {
//             type: DataTypes.DATE,
//             allowNull: false
//         },
//         status: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: 0
//         },
//         createdAt: {
//             allowNull: false,
//             type: "TIMESTAMP",
//             defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//             allowNull: false,
//             type: "TIMESTAMP",
//             defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
//         }
//     },
//     {
//         tableName: 'Todos'
//     }
// )

// Todo.belongsTo(User, {onDelete: 'CASCADE'});

// module.exports = Todo;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {as: 'User'})
    }
  };

    Todo.init({
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        createdAt: {
            allowNull: false,
            type: "TIMESTAMP",
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: "TIMESTAMP",
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        modelName: 'Todo',
        tableName: 'todos',
    });


    return Todo;
};