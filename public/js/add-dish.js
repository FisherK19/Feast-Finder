// Function to handle adding a new recipe
function addRecipeHandler(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/recipes', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request succeeded
          window.location.href = '/recipes'; // Redirect to recipes page
        } else {
          // Handle errors
          alert('Failed to add recipe. Please try again.');
        }
      }
    };
    xhr.send(formData);
  }
  
  document.getElementById('addRecipeForm').addEventListener('submit', addRecipeHandler);
  