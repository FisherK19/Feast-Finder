const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Require the authentication middleware and helper functions
const { verifyToken } = require('./utils/auth');
const { handleError } = require('./utils/helper');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for authentication
app.use(verifyToken);

// Middleware for your controllers
const recipeRoutes = require('./controllers/api/recipeRoutes');
const userRoutes = require('./controllers/api/userRoutes');
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
