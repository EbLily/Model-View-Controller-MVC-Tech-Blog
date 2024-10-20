const router = require('express').Router();
const { Tech, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const helpers = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    // Get all techs and JOIN with user data
    const techData = await Tech.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

  //  console.log(" Data: ", techData);
    // Serialize data so the template can read it
    const techs = techData.map((tech) => tech.get({ plain: true }));
  //  console.log("Tech Data: ", techs)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      techs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log("err: ", err)
    res.status(500).json(err.messages);
  }
});

router.get('/tech/:id', async (req, res) => {
  try {
    const techData = await Tech.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!techData) {
      res.status(404).render('404', { message: 'Blog post not found', logged_in: req.session.logged_in });
      return;
    }

    const tech = techData.get({ plain: true });

    tech.date = helpers.format_date(tech.date_created);

    res.render('tech', {
      ...tech,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard',  withAuth,  async (req, res) => {
  console.log("____________")
  try {
    // Find the logged in user based on the session ID
    
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Tech, as: 'techs' }],
    });

    const user = userData.get({ plain: true });
   
    res.render('profile', {
      ...user,
      techs: user.techs,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
