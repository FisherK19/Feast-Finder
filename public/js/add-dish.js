document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addRecipeForm').addEventListener('submit', addRecipeHandler);
});

async function addRecipeHandler(event) {
  event.preventDefault();

  const recipeName = document.querySelector('#recipeName').value;
  const ingredients = document.querySelector('#ingredients').value;
  const directions = document.querySelector('#directions').value;

  const response = await fetch('/recipes', { // Change the URL to match your server route
      method: 'POST',
      body: JSON.stringify({
          recipeName,
          ingredients,
          directions,
      }),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (response.ok) {
      const newRecipe = await response.json(); // Parse the JSON response
      renderRecipe(newRecipe); // Call a function to render the new recipe
  } else {
      alert('Failed to add recipe');
  }
}

function renderRecipe(recipe) {
  const recipeContainer = document.querySelector('.recipes-container');
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');
  recipeCard.innerHTML = `
      <h2>${recipe.recipe_name}</h2>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Directions:</strong> ${recipe.directions}</p>
  `;
  recipeContainer.appendChild(recipeCard);
}






  