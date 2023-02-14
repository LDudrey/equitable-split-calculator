const sequelize = require('../config/connection');
const { User, Bill, UserBill } = require('../models');

const userData = require('./userData.json');
const billData = require('./billData.json');
const userBillData = require('./userBillData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //bulk create users and apply individual hooks to each user
    await User.bulkCreate(userData, {individualHooks: true});
    console.log('\n----- USERS SEEDED -----\n');

    //bulk create bills from bill seed
    await Bill.bulkCreate(billData);
    console.log('\n----- BILLS SEEDED -----\n');

    //bulk create bills from bill seed
    await UserBill.bulkCreate(userBillData);
    console.log('\n----- USER BILLS SEEDED -----\n');

    process.exit(0);
};

seedDatabase();