const sequelize = require('../config/connection');
const { User, Bill, UserBill } = require('../models');

const userData = require('./userData.json');
const billData = require('./billData.json');
const userBillData = require('./userBillData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //bulk create users and apply individual hooks to each user
    await User.bulkCreate(userData, {individualHooks: true});

    //bulk create bills from bill seed
    await Bill.bulkCreate(billData);

    //bulk create bills from bill seed
    await UserBill.bulkCreate(userBillData);

    process.exit(0);
};

seedDatabase();