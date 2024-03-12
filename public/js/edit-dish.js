async function editFormHandler(event) {
  event.preventDefault();
  
  // Get the values of recipe_name, ingredients, and instructions from the form inputs
  const recipe_name = document.querySelector('#recipe_name').value;
  const ingredients = document.querySelector('#ingredients').value;
  const instructions = document.querySelector('#instructions').value;

  // Extract the recipe ID from the URL using window.location and string manipulation
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Make a PUT request to the server to update the recipe with the specified ID
  const response = await fetch(`/api/recipes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      recipe_name,
      ingredients,
      instructions,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // If the response is successful (status code 200), redirect to the recipe details page
  if (response.ok) {
    document.location.replace(`/recipes/${id}`);
  } else {
    // If the response is not successful, show an alert indicating failure
    alert('Failed to edit recipe');
  }
}

// Attach an event listener to the form to handle form submission
document.querySelector('.edit-recipe-form').addEventListener('submit', editFormHandler);

  