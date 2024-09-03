'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageRecipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {as: 'User'});
        this.belongsTo(models.Message, {as: 'Message'});
        this.belongsTo(models.Room, {as: 'Room'});


    }
  };

    MessageRecipient.init({
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
        modelName: 'MessageRecipient',
        tableName: 'MessageRecipients',
    });


  return MessageRecipient;
};