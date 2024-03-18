// Function to handle editing a recipe
async function editRecipeHandler(event) {
    event.preventDefault();
    console.log('Edit form submitted'); // Check if event listener is triggered

    const form = event.target;
    console.log('Form:', form); // Log the form element

    const recipeId = form.getAttribute('data-id');
    console.log('Recipe ID:', recipeId); // Log the recipe ID

    const recipeName = form.querySelector(`#recipeName_${recipeId}`).value;
    const ingredients = form.querySelector(`#ingredients_${recipeId}`).value;
    const directions = form.querySelector(`#directions_${recipeId}`).value;

    console.log('Recipe Name:', recipeName); // Log recipeName
    console.log('Ingredients:', ingredients); // Log ingredients
    console.log('Directions:', directions); // Log directions

    try {
        // Send a fetch request to update the recipe
        const response = await fetch(`/recipes/${recipeId}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipeName: recipeName,
                ingredients: ingredients,
                directions: directions
            })
        });

        if (response.ok) {
            // Recipe updated successfully
            console.log('Recipe updated successfully');
            // Redirect to recipes page after editing a recipe
            window.location.href = '/recipes';
        } else {
            // Handle form submission error
            console.error('Failed to update recipe');
            alert('Failed to update recipe. Please try again.');
        }
    } catch (error) {
        console.error('Error editing recipe:', error);
        alert('An error occurred while editing the recipe');
    }
}

// Event listener to handle form submission for editing
document.querySelectorAll('.edit-recipe-form').forEach(form => {
    form.addEventListener('submit', editRecipeHandler);
});