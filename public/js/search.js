async function searchHandler(event) {
    event.preventDefault();

    const searchQuery = document.getElementById('searchQuery').value;

    try {
        const response = await fetch(`/recipes/search?query=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
            const data = await response.json();
            const recipes = data.recipes;

            const searchResultsElement = document.getElementById('searchResults');
            searchResultsElement.innerHTML = '';

            if (recipes.length > 0) {
                recipes.forEach(recipe => {
                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('recipe-card');
                    recipeCard.innerHTML = `
                        <h2>${recipe.recipeName}</h2>
                        <img src="${recipe.imageUrl}" alt="Recipe Image">
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Directions:</strong> ${recipe.directions}</p>
                    `;
                    searchResultsElement.appendChild(recipeCard);
                });
            } else {
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

document.getElementById('searchForm').addEventListener('submit', searchHandler);
