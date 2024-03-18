// Function to handle form submission for adding a recipe with image upload
async function addRecipeHandler(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(document.getElementById('addRecipeForm'));

    try {
        // Send a fetch request to submit the recipe
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

// Function to handle form submission for uploading an image
async function uploadImageHandler(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(document.getElementById('uploadImageForm'));

    try {
        // Send a fetch request to upload the image
        const imageResponse = await fetch('/recipes/upload-image', {
            method: 'POST',
            body: formData
        });

        if (imageResponse.ok) {
            // Image uploaded successfully
            console.log('Image uploaded successfully');
        } else {
            // Handle image upload error
            console.error('Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Event listener to handle form submission for uploading an image
document.getElementById('uploadImageForm').addEventListener('submit', uploadImageHandler);
