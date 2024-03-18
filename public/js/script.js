// Function to handle form submission for adding a recipe with image upload
async function addRecipeHandler(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(document.getElementById('addRecipeForm'));
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    // Append the image file to the form data
    formData.append('image', file);

    try {
        // Send a fetch request to upload the image
        const imageResponse = await fetch('/recipes/upload-image', {
            method: 'POST',
            body: formData
        });

        if (!imageResponse.ok) {
            throw new Error('Failed to upload image');
        }

        // Proceed with recipe submission after image upload
        const recipeResponse = await fetch('/recipes', {
            method: 'POST',
            body: formData
        });

        if (recipeResponse.ok) {
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
