// edit-dish.js

// Function to handle editing a recipe
async function editRecipeHandler(event) {
    event.preventDefault();
    
    const form = event.target;
    const recipeId = form.getAttribute('data-id');
    const recipeName = form.querySelector(`#recipeName_${recipeId}`).value;
    const ingredients = form.querySelector(`#ingredients_${recipeId}`).value;
    const directions = form.querySelector(`#directions_${recipeId}`).value;
  
    try {
        const response = await fetch(`/recipes/${recipeId}/edit`, {
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
            // Update the UI with the updated recipe data
            const updatedRecipe = await response.json();
            // For example, you can update the existing recipe card with the updated recipe data
        } else {
            alert('Failed to edit recipe');
        }
    } catch (error) {
        console.error('Error editing recipe:', error);
        alert('An error occurred while editing the recipe');
    }
}

// Event listener to handle form submission for editing
document.addEventListener('submit', function(event) {
    if (event.target.matches('.edit-form')) {
        editRecipeHandler(event);
    }
});
// JavaScript to toggle edit form visibility
document.addEventListener('click', function(event) {
    if (event.target.matches('.edit-button')) {
        const recipeId = event.target.dataset.id;
        const editForm = document.getElementById(`editForm_${recipeId}`);
        if (editForm) {
            editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
        }
    }
});


 