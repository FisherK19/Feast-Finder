// Import necessary modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/connection');
const recipeRoutes = require('./controllers/api/recipeRoutes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars view engine
const hbs = exphbs.create({
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Mount the recipe routes
app.use('/recipes', recipeRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Login route
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // Handle login logic here
    req.session.username = req.body.username; // Assuming username is stored in session
    res.redirect('/recipes');
});

// Register route
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    // Handle registration logic here
    res.redirect('/login');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
