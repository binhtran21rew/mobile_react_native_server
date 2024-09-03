const Sequelize = require("sequelize");
/**
*﻿ Database Connection.
**/
const {sequelize, DataTypes} = require('../config/connection')

const Todo = require("./todoModel")(sequelize, DataTypes);
const User = require("./userModel")(sequelize, DataTypes);
const Room = require("./roomModel")(sequelize, DataTypes);
const RoomChat = require("./roomchatModel")(sequelize, DataTypes);
const Message = require("./messageModel")(sequelize, DataTypes);
const MessageRecipient = require("./messagerecipentModel")(sequelize, DataTypes);
const models = {
    Todo,
    User,
    Room,
    RoomChat,
    Message,
    MessageRecipient
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const db = {
    ...models,
    sequelize
};

module.exports = db;