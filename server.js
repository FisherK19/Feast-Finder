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

// Exclude the login route from authentication middleware
const loginRoute = require('./controllers/api/loginRoute');
app.use('/login', loginRoute);

// Middleware for authentication (applied to routes after login)
app.use(verifyToken);

// Middleware for your controllers
const recipeController = require('./controllers/recipecontroller');
const userRoutes = require('./controllers/api/userRoutes');
const recipeRoutes = require('./controllers/api/recipeRoutes'); 
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

