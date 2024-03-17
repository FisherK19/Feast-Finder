
// Function to format response data
const formatResponse = (data) => {
    // Perform any necessary formatting of the response data
    return data;
  };
  
  // Function to handle errors
  const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  };
  
  module.exports = {
    formatResponse,
    handleError
  };
  