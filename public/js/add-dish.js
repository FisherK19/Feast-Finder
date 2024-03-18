// Function to handle adding a new recipe
function addRecipeHandler(event) {
    event.preventDefault();
    console.log('Form submitted');

    const form = event.target;
    const recipeName = form.querySelector('#recipeName').value;
    const ingredients = form.querySelector('#ingredients').value;
    const directions = form.querySelector('#directions').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/recipes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Request succeeded
                console.log('Recipe added successfully');
                // Redirect to recipes page after adding a recipe
                window.location.href = '/recipes';
            } else {
                // Handle errors
                console.error('Failed to add recipe');
                alert('Failed to add recipe. Please try again.');
            }
        }
    };
    xhr.send(JSON.stringify({
        recipeName: recipeName,
        ingredients: ingredients,
        directions: directions
    }));
}

// Event listener to handle form submission for adding a recipe
document.getElementById('addRecipeForm').addEventListener('submit', addRecipeHandler);

