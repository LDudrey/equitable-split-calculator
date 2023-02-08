const User = require('./User');
const Bill = require('./Bill');
const UserBill = require('./UserBill');

//User has many Goals--creates foreign key in goal table
User.hasMany(Bill, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Bill.hasMany(User, {
    foreignKey: 'bill_id',
    onDelete: 'CASCADE'
});

Bill.belongsToMany(User, {
    through: UserBill,
    foreignKey: 'bill_id'
});

User.belongsToMany(Bill, {
    through: UserBill,
    foreignKey: 'user_id'
});

module.exports = { User, Bill, UserBill };