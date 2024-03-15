// Middleware to verify user authentication
const authenticateUser = (req, res, next) => {
  // Check if the user is authenticated (e.g., check session or cookie)
  if (req.session && req.session.user) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, send a 401 Unauthorized response
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
};

module.exports = {
  authenticateUser
};
