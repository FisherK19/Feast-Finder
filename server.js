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

// Set the views directory path
app.set('views', path.join(__dirname, 'views'));

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

// Server-side route to handle recipe editing
app.post('/recipes/:id/edit', async (req, res) => {
    try {
      const { id } = req.params;
      const { recipeName, ingredients, directions } = req.body;
  
      // Find the recipe by ID
      const recipe = await Recipe.findByPk(id);
  
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      // Update the recipe with new data
      recipe.recipeName = recipeName;
      recipe.ingredients = ingredients;
      recipe.directions = directions;
  
      // Save the updated recipe to the database
      await recipe.save();
  
      // Respond with success message
      res.status(200).json({ message: 'Recipe updated successfully' });
    } catch (error) {
      console.error('Error editing recipe:', error);
      res.status(500).json({ error: 'Failed to edit recipe' });
    }
  });
  

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
