const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/connection'); 
const recipeRoutes = require('./controllers/api/recipeRoutes');
const multer = require('multer');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Serve uploads folder as static
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use an environment variable
    resave: false,
    saveUninitialized: false,
}));

// Use recipe routes
app.use(recipeRoutes);
// Routes
const upload = multer({ dest: 'uploads/' });

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
    req.session.username = req.body.username; 
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

// Search Recipe Route
app.get('/recipes/search', async (req, res) => {
    try {
        const searchQuery = req.query.query;
        // Perform a database query to find recipes matching the search query
        const searchResults = await Recipe.findAll({
            where: {
                recipe_name: {
                    [Op.iLike]: `%${searchQuery}%` // Case-insensitive search
                }
            }
        });
        res.json(searchResults);
    } catch (error) {
        console.error('Error searching for recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define route handler for image upload
app.post('/recipes/upload-image', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file.path; 
        // Update the recipe record with the image URL
        const recipe = await Recipe.findByPk(req.body.recipeId);
        if (recipe) {
            recipe.imageUrl = imageUrl;
            await recipe.save();
            res.status(200).json({ imageUrl });
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
