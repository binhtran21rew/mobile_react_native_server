// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// const Chat = sequelize.define(
//     'Chat',
//     {
//         member: {
//             type: DataTypes.JSON,
//             allowNull: false,
//             get:function(){
//                 return JSON.parse(this.getDataValue("member"));
//             },
//             set(value) {
//                 let data = {}
//                 if(value['data'] && typeof value === "object"){

//                     for(item of value['data']){
//                         data = {...data, ['user_'+item]: item}
//                     }
//                     return this.setDataValue('member', data);
//                 }else if(value.includes(',') && typeof value === 'string'){
//                     for(item of JSON.parse(value)){
//                         data = {...data, ['user_'+item]: item}
//                     }

//                     return this.setDataValue('member', JSON.stringify(data));
//                 }else{
//                     for(item of JSON.parse(value)){
//                         data = {...data, ['user_'+item]: item}
//                     }
//                     return this.setDataValue('member', JSON.stringify(data));
//                 }
//             }
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
// );


// module.exports = Chat;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// const User = require('./userModel');
// const RoomChat = require('./roomchatModel');

// const Room = sequelize.define(
//     'Room',
//     {
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
// );

// Room.belongsToMany(sequelize.define('User'), {through: "RoomChat"})


// module.exports = Room;



'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here

    }
  };

    RoomChat.init({
        id: {
          type: DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
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
        modelName: 'RoomChat',
        tableName: 'RoomChats',
    });


  return RoomChat;
};