const router = require('express').Router();
const homeRoutes = require('../homecontroller');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes'); 

router.use('/home', homeRoutes);
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);

module.exports = router;

