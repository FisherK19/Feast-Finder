document.addEventListener('DOMContentLoaded', function() {
    const addRecipeForm = document.getElementById('addRecipeForm');
    const editRecipeForms = document.querySelectorAll('.edit-recipe-form');

    addRecipeForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(addRecipeForm);

        try {
            const response = await fetch('/recipes', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                window.location.href = '/recipes';
            } else {
                console.error('Failed to add recipe');
                alert('Failed to add recipe. Please try again.');
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('An error occurred while adding the recipe');
        }
    });

    
});
