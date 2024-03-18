// Function to handle form submission for adding a recipe with image upload
async function addRecipeHandler(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(document.getElementById('addRecipeForm'));

    try {
        // Send a fetch request to upload the image and submit the recipe
        const response = await fetch('/recipes', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Recipe added successfully
            window.location.href = '/recipes'; // Redirect to recipe list page
        } else {
            // Handle form submission error
            console.error('Failed to add recipe');
        }
    } catch (error) {
        console.error('Error adding recipe:', error);
    }
}

// Event listener to handle form submission for adding a recipe
document.getElementById('addRecipeForm').addEventListener('submit', addRecipeHandler);
