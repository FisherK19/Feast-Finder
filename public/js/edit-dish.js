// Function to handle editing a recipe
async function editRecipeHandler(event) {
  event.preventDefault();

  // Extract data from the form
  const recipeName = document.querySelector('#recipeName').value;
  const ingredients = document.querySelector('#ingredients').value;
  const directions = document.querySelector('#directions').value;

  // Extract recipe ID from the URL
  const id = window.location.pathname.split('/').pop();

  try {
    // Send a request to update the recipe
    const response = await fetch(`/recipes/${id}/edit`, {
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
      // Reload the page to reflect the changes
      document.location.reload();
    } else {
      // Handle the case where editing fails
      alert('Failed to edit recipe');
    }
  } catch (error) {
    console.error('Error editing recipe:', error);
    // Handle errors
    alert('An error occurred while editing the recipe');
  }
}

// Event listener to handle form submission for editing
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the edit form submit button
  document.querySelector('.edit-form').addEventListener('submit', editRecipeHandler);
});





  