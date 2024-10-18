const router = require('express').Router();
const userRoutes = require('./userRoutes');
const techRoutes = require('./techRoutes');

router.use('/users', userRoutes);
router.use('/techs', techRoutes);

module.exports = router;
