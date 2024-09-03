// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');


// const RoomChat = sequelize.define(
//     'RoomChat',
//     {
//         message: {
//             type: DataTypes.STRING,
//         },
//         form:{
//             type: DataTypes.INTEGER,

//         },
//         to:{
//             type: DataTypes.INTEGER,
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
//     }
// )


// module.exports = RoomChat;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        this.hasMany(models.MessageRecipient, {as: 'MessageRecipient'});
        this.belongsToMany(models.User, {through: 'RoomChat', as: 'RoomChats'});

    }
  };

    Room.init({
        name:{
            type: DataTypes.STRING,
        },
        image:{
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
        modelName: 'Room',
        tableName: 'Rooms',
    });


  return Room;
};