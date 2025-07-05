// This file initializes the middleware for the application.
// Import necessary middleware
const AppMiddleware = require('./App.middleware');
const ErrorHandlerMiddleware = require('./ErrorHandler.middleware');

// Middleware initialization function
const initMiddleware = (app) => {
    // Use application middleware
    app.use(AppMiddleware);
    
    // Use error handling middleware
    app.use(ErrorHandlerMiddleware);
};

// Export the middleware initialization function
module.exports = initMiddleware;