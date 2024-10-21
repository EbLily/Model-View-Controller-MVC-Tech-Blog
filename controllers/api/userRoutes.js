const router = require('express').Router();
const { User } = require('../../models');

// All routes up to this file are prefixed with '/api/users'
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'You are now signed up and logged in!' });
    });
  } catch (err) {
    console.error("User Error: ", err);
    if (err.name === 'SequelizeValidationError') {
      const validationErrors = err.errors.map(e => e.message);
      res.status(400).json({ message: 'Validation error', errors: validationErrors });
    } else {
      res.status(500).json({ message: 'An error occurred during sign up. Please try again.' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'You have been logged out successfully.' });
    });
  } else {
    res.status(404).json({ message: 'No active session found.' });
  }
});

module.exports = router;
