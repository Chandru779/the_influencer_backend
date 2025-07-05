import express from 'express';
import bodyParser from 'body-parser';
// import appConfig from './app/config/app.conf.js';
// import dbInit from './app/database/init.js';
// import middlewareInit from './app/middleware/init.js';
import routes from './app/routes/App.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware initialization
// middlewareInit(app);
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database initialization
// dbInit();

// Routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});