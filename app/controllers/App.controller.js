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

    async getStockNews(req,res){
        try {
            const data = await fetchStockNews('https://example.com/stocks');
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch stock news' });
        }
    }

    // Additional methods for application-level logic can be added here
}

export default AppController;