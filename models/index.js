const User = require('./User');
const Bill = require('./Bill');
const UserBill = require('./UserBill');

// User can have many Bills
User.hasMany(Bill, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Bill can have many Users
Bill.hasMany(User, {
    foreignKey: 'bill_id',
    onDelete: 'CASCADE',
});

// Bill belongs to many Users through the UserBill model
Bill.belongsToMany(User, {
    through: UserBill,
    foreignKey: 'bill_id',
});

// User belongs to many Bills through the UserBill model
User.belongsToMany(Bill, {
    through: UserBill,
    foreignKey: 'user_id',
});

module.exports = { User, Bill, UserBill };