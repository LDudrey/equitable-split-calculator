const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserBill extends Model { }

UserBill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    bill_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bill',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_bill',
  }
);

module.exports = UserBill;
