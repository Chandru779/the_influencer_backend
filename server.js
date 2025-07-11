import express from 'express';
import bodyParser from 'body-parser';
// import appConfig from './app/config/app.conf.js';
import {initDatabase} from './app/database/init.js';
// import middlewareInit from './app/middleware/init.js';
import routes from './app/routes/App.routes.js';
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
// Middleware initialization
// middlewareInit(app);
// Body parser middleware
await initDatabase();
console.log("OUTREEEEE")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});