const router = require('express').Router();
const { User, Bill, UserBill } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all bills and JOIN with user data
router.get('/', withAuth, async (req, res) => {
  try {
    const billData = await Bill.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [User],
      attributes: [
        'id',
        'bill_name',
        'amount'
      ],
    });

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({plain: true});
    const bills = billData.map((bill) => bill.get({ plain: true }));

    res.render('profile', {
        bills,
        user: user,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single bill by ID  
router.get('/bill/:id', withAuth, async (req, res) => {
  try {
    const billData = await Bill.findByPk(req.params.id, {
        include: [
            {
            model: User,
            attributes: ['username'],
            },
        ],
    });

    const bill = billData.get({ plain: true });

    res.render('bills', {
        ...bill,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST/CREATE new bill
router.post('/', withAuth, async (req, res) => {
    try {
      const newBill = await Bill.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBill);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // // TODO: Future functionality
  // // DELETE Post
  // router.delete('/bill/:id', async (req, res) => {
  //   try {
  //     const billData = await Bill.destroy({
  //       where: {
  //         id: req.params.id,
  //         user_id: req.session.user_id,
  //       },
  //     });
  
  //     if (!billData) {
  //       res.status(404).json({ message: 'This post no longer exists!' });
  //       return;
  //     }
  
  //     res.status(200).json(billData);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

module.exports = router;
