// Import necessary modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Recipe = require('./models/recipe');
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

// Routes

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

// Recipes route
app.get('/recipes', async (req, res) => {
    try {
        // Retrieve username from session
        const username = req.session.username;
        // Retrieve recipeName from session
        const recipeName = req.session.recipeName;
        // Fetch recipes from the database
        const recipes = await Recipe.findAll();
        // Render the recipes page with the username, recipeName, and recipes
        res.render('recipe', { username, recipeName, recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/recipes', async (req, res) => {
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
        // Save recipeName in session
        req.session.recipeName = recipeName;
        res.redirect('/recipes'); // Redirect to refresh the page
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Edit Recipe Route (GET)
app.get('/recipes/:id/edit', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Render a form to edit the recipe
        res.render('edit-recipe', { recipe });
    } catch (error) {
        console.error('Error editing recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Recipe Route (POST)
app.post('/recipes/:id/edit', async (req, res) => {
    try {
        const { recipeName, ingredients, directions } = req.body;
        const recipeId = req.params.id;
        // Find the recipe by ID
        const recipe = await Recipe.findByPk(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Update the recipe
        await recipe.update({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions
        });
        res.redirect('/recipes'); // Redirect back to the recipe page
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Recipe Route (POST)
app.post('/recipes/:id/delete', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Delete the recipe from the database
        await recipe.destroy();
        res.redirect('/recipes'); // Redirect back to the recipe page
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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
