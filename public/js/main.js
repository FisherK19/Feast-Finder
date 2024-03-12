// Function to handle form submission when adding a new recipe
async function addRecipeHandler(event) {
    event.preventDefault();
    
    // Get the values of recipe_name, ingredients, and instructions from the form inputs
    const recipe_name = document.querySelector('#recipe_name').value;
    const ingredients = document.querySelector('#ingredients').value;
    const instructions = document.querySelector('#instructions').value;
  
    // Make a POST request to the server to add the new recipe
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({
        recipe_name,
        ingredients,
        instructions,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // If the response is successful (status code 200), reload the page to display the new recipe
    if (response.ok) {
      document.location.reload();
    } else {
      // If the response is not successful, show an alert indicating failure
      alert('Failed to add recipe');
    }
}

// Attach an event listener to the form to handle form submission when adding a new recipe
document.querySelector('.add-recipe-form').addEventListener('submit', addRecipeHandler);

// Function to handle deleting a recipe
async function deleteRecipeHandler(event) {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      // Make a DELETE request to the server to delete the recipe with the specified ID
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });
  
      // If the response is successful (status code 200), reload the page to reflect the deletion
      if (response.ok) {
        document.location.reload();
      } else {
        // If the response is not successful, show an alert indicating failure
        alert('Failed to delete recipe');
      }
    }
}

// Attach event listeners to handle recipe deletion (e.g., when clicking on a delete button)
document.querySelectorAll('.delete-recipe-btn').forEach(btn => {
    btn.addEventListener('click', deleteRecipeHandler);
});
