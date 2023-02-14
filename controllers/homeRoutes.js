const router = require('express').Router();

// Landing page
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/api/profile');
    return;
  }
  res.render('login');
});

module.exports = router;