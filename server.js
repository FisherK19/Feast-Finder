// Import required modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Create an instance of the Express application
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

// Initialize express-session middleware and cookie-parser
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } 
}));

// Middleware for your controllers
const userRoutes = require('./controllers/api/userRoutes');
const recipeRoutes = require('./controllers/api/recipeRoutes'); 
const loginRoute = require('./controllers/api/loginRoute');
const registerRoute = require('./controllers/api/registerRoute');

// Use Router for routes
const router = express.Router();

// Define routes
router.get('/login', (req, res) => {
    res.render('login'); // Renders the login page
});

router.get('/register', (req, res) => {
    res.render('register'); 
});

router.get('/recipe', (req, res) => {
    res.render('recipe'); 
});

// Handle registration form submission
router.post('/register', (req, res) => {
    // Handle registration logic here
    // After successful registration, redirect the user to the login page
    res.redirect('/login');
});

// Handle login form submission
router.post('/login', (req, res) => {
    // Handle login logic here
    // After successful login, redirect the user to the home page
    res.redirect('/');
});

// Use the router middleware
app.use('/', router);

// Route handler for the root URL
app.get('/', (req, res) => {
    res.render('home'); 
});

// Error handling middleware
app.use((err, req, res, next) => {
    handleError(err, res);
});

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
