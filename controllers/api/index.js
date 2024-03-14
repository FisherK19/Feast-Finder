const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./api/userRoutes'); 

router.use('/home', homeRoutes);
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);

module.exports = router;

