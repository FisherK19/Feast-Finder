// Import necessary modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Recipe = require('./models/recipe');
const sequelize = require('./config/connection'); 


// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars view engine
const hbs = exphbs.create({});
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
    cookie: { secure: true } 
}));
app.use(cors({
    origin: 'http://localhost:3001' 
}));

// Routes
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.render('home');
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    // Handle login logic here
    res.redirect('/recipes');
});

// Register route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // Handle registration logic here
    res.redirect('/login');
});

// Recipes route
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        res.render('recipe', { recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/recipes', async (req, res) => {
    try {
        const { recipeName, ingredients, directions } = req.body;
        if (!recipeName || !ingredients || !directions) {
            return res.status(400).json({ error: "Please provide values for recipeName, ingredients, and directions." });
        }
        const newRecipe = await Recipe.create({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add routes to the app
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
    handleError(err, res);
});

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

