async function newRecipeHandler(event) {
  event.preventDefault();

  const recipeName = document.querySelector('#recipe_name').value;
  const ingredients = document.querySelector('#ingredients').value;
  const instructions = document.querySelector('#instructions').value;

  const response = await fetch(`/api/recipes`, {
    method: 'POST',
    body: JSON.stringify({
      recipe_name: recipeName,
      ingredients,
      instructions,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add recipe');
  }
}

document
.querySelector('.new-recipe-form')
.addEventListener('submit', newRecipeHandler);

  