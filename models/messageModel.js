'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {as: 'User'});
        this.hasMany(models.MessageRecipient, {as: 'MessageRecipient'});
    }
  };

    Message.init({
        text: {
            type: DataTypes.STRING
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
        modelName: 'Message',
        tableName: 'Messages',
    });


  return Message;
};