async function editRecipeHandler(event) {
  event.preventDefault();
  
  const recipeName = document.querySelector('#recipeName').value;
  const ingredients = document.querySelector('#ingredients').value;
  const directions = document.querySelector('#directions').value;

  const id = window.location.toString().split('/').pop();

  const response = await fetch(`/recipes/${id}`, {
    method: 'PUT',
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
    document.location.replace(`/recipes/${id}`);
  } else {
    alert('Failed to edit recipe');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the edit form submit button
  document.querySelector('.edit-form .submit-button').addEventListener('click', editRecipeHandler);

  // Manipulate DOM elements
  document.querySelector('.some-element').textContent = 'Updated text';
});



  