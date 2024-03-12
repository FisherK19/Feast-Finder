// Function to handle searching for recipes
async function searchRecipes(query) {
    try {
        // Make a GET request to the server to search for recipes based on the provided query
        const response = await fetch(`/api/recipes/search?query=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const recipes = await response.json();
        // Process the retrieved recipes (e.g., display them on the page)
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error searching for recipes:', error);
        // Display an error message to the user
        // (e.g., update the UI to show that the search failed)
    }
}

// Function to display search results (e.g., render recipes on the page)
function displayRecipes(recipes) {
    // Clear previous search results (if any)
    // (e.g., remove existing recipe cards from the DOM)
    
    // Iterate over the retrieved recipes and generate HTML elements to display them
    // (e.g., create recipe cards with recipe name, ingredients, etc.)
    
    // Append the generated HTML elements to the appropriate container in the DOM
}

// Function to handle search form submission
function searchFormHandler(event) {
    event.preventDefault();
    // Extract the search query from the form input
    const query = document.querySelector('#search-input').value.trim();
    // Call the searchRecipes function with the extracted query
    searchRecipes(query);
}

// Attach an event listener to the search form to handle form submission
document.querySelector('.search-form').addEventListener('submit', searchFormHandler);
