// Function to handle form submission
const submitRecipeForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById('recipeForm'));
    try {
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
};

// Event listener to handle form submission
document.getElementById('recipeForm').addEventListener('submit', submitRecipeForm);

// Event listener to handle image upload
const imageInput = document.getElementById('imageUpload');
imageInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await fetch('/recipes/upload-image', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            // Image uploaded successfully
        } else {
            // Handle upload error
            console.error('Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
});
