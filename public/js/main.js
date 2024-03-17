// Function to handle deletion of a recipe
async function deleteRecipeHandler(event) {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/recipes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete recipe');
    }
  }
}

// Attach event listeners for recipe deletion
document.querySelectorAll('.delete-recipe-btn').forEach(btn => {
  btn.addEventListener('click', deleteRecipeHandler);
});

