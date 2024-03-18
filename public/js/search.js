// Function to handle search form submission
async function searchHandler(event) {
    event.preventDefault();

    // Get the search query from the form input
    const searchQuery = document.getElementById('searchQuery').value;

    try {
        // Send an AJAX request to the server to search for recipes
        const response = await fetch(`/recipes/search?query=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
            const recipes = data.recipes;

            // Display the search results on the webpage
            const searchResultsElement = document.getElementById('searchResults');
            searchResultsElement.innerHTML = ''; // Clear previous search results

            if (recipes.length > 0) {
                recipes.forEach(recipe => {
                    // Create HTML elements to display each recipe
                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('recipe-card');
                    recipeCard.innerHTML = `
                        <h2>${recipe.recipeName}</h2>
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Directions:</strong> ${recipe.directions}</p>
                    `;
                    searchResultsElement.appendChild(recipeCard);
                });
            } else {
                // Display a message if no matching recipes found
                searchResultsElement.innerHTML = '<p>No matching recipes found.</p>';
            }
        } else {
            console.error('Failed to search recipes');
            alert('An error occurred while searching recipes');
        }
    } catch (error) {
        console.error('Error searching recipes:', error);
        alert('An error occurred while searching recipes');
    }
}

    // Attach the event listener to handle search form submission
    document.getElementById('searchForm').addEventListener('submit', searchHandler);

