import { generateResponse } from "../helpers/App.helper.js";
import { fetchStockNews } from "../services/StockScrapper.service.js";

class AppController {
    constructor() {
        // Initialize any properties if needed
    }

    // Example method to handle a request
    async index(req, res) {
        console.log('Request received at / with method:', req.method);
        res.send('Welcome to the App!');
    }

    // Additional methods for application-level logic can be added here
}

export default AppController;