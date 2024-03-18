// Function to handle adding a new recipe
function addRecipeHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Send a fetch request instead of using XMLHttpRequest
  fetch('/recipes', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      // Request succeeded
      window.location.href = '/recipes'; // Redirect to recipes page
    } else {
      // Handle errors
      throw new Error('Failed to add recipe. Please try again.');
    }
  })
  .catch(error => {
    console.error(error);
    alert(error.message);
  });
}

// Attach event listener only if it hasn't been attached before
const addRecipeForm = document.getElementById('addRecipeForm');
if (!addRecipeForm.hasAttribute('data-listener')) {
  addRecipeForm.setAttribute('data-listener', 'true');
  addRecipeForm.addEventListener('submit', addRecipeHandler);
}
