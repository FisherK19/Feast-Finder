// Function to handle form submission when adding a new recipe
async function addRecipeHandler(event) {
  event.preventDefault();
  
  const recipeName = document.querySelector('#recipeName').value;
  const ingredients = document.querySelector('#ingredients').value;
  const directions = document.querySelector('#directions').value;

  const response = await fetch('/recipes', {
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
    document.location.reload();
  } else {
    alert('Failed to add recipe');
  }
}
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to a form submit button
  document.querySelector('.submit-button').addEventListener('click', function(event) {
      event.preventDefault();
      // Code to handle form submission
  });

  // Manipulate DOM elements
  document.querySelector('.some-element').textContent = 'Updated text';
});




  