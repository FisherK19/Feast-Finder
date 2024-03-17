async function searchRecipes(query) {
    try {
        const response = await fetch(`/recipes/search?query=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error searching for recipes:', error);
    }
}

function displayRecipes(recipes) {
    // Display recipes in the UI
}

function searchFormHandler(event) {
    event.preventDefault();
    const query = document.querySelector('#searchInput').value.trim();
    searchRecipes(query);
}

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the search form submit button
    document.querySelector('.search-form').addEventListener('submit', searchFormHandler);
});

