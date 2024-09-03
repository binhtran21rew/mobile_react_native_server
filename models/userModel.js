// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// const Todo = require('./todoModel');
// const Room = require('./chatModel')
// const RoomChat = require('./roomchatModel');

// const User = sequelize.define(
//     'User',
//     {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         image: {
//             type: DataTypes.STRING,
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
//         tableName: 'Users'
//     }

// )


// User.hasMany(sequelize.define('Todo'), {onDelete: 'CASCADE'})
// User.belongsToMany(sequelize.models.Room, {through: "RoomChat"})
// module.exports = User;



'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Todo, {as: 'Todo'});
      this.belongsToMany(models.Room, {through: 'RoomChat', as: 'RoomChats'});
      this.hasMany(models.Message, {as: 'Message'});
      this.hasMany(models.MessageRecipient, {as: 'MessageRecipient'});

    }
  };

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
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
        modelName: 'User',
        tableName: 'users',
    });


  return User;
};