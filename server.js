const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

// Initialize express-session middleware and cookie-parser
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } 
}));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for your controllers
const userRoutes = require('./controllers/api/userRoutes');
const recipeRoutes = require('./controllers/api/recipeRoutes'); 
const loginRoute = require('./controllers/api/loginRoute');
const registerRoute = require('./controllers/api/registerRoute');
app.use('/recipes', recipeRoutes); 
app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/register', registerRoute);

// Route handler for the root URL
app.get('/', (req, res) => {
    res.render('home'); // Assuming 'home.handlebars' is in the 'views' directory
});

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
