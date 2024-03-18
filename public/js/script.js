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

    editRecipeForms.forEach(function(form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const recipeId = form.getAttribute('data-id');

            try {
                const response = await fetch(`/recipes/${recipeId}/edit`, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    window.location.href = '/recipes';
                } else {
                    console.error('Failed to edit recipe');
                    alert('Failed to edit recipe. Please try again.');
                }
            } catch (error) {
                console.error('Error editing recipe:', error);
                alert('An error occurred while editing the recipe');
            }
        });
    });
});
