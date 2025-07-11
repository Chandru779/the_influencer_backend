import { generateResponse } from "../helpers/App.helper.js";
import { newsModel } from "../models/News.model.js";
import { fetchStockNews } from "../services/StockScrapper.service.js";

class NewsController {
  constructor() {}

  async createNews(req, res) {
    try {
      const results = await fetchStockNews("https://www.livemint.com/market");
      console.log("results", results);
      if (!Array.isArray(results) || results.length === 0) {
        return res
          .status(400)
          .json(generateResponse(400, "No news Fetched", []));
      }
      const savedNews = await newsModel.insertMany(results);
      console.log("savedNews", savedNews);
      return res.json(
        generateResponse(201, "News Saved to collection", savedNews)
      );
    } catch (err) {
      console.log("Error in storing data", err);
      res.sendStatus(500);
    }
  }

  async getNews(req, res) {
    try {
      const newsId = req.params.id;
      // if (newsId && !mongoose.Types.ObjectId.isValid(newsId)) {
      //   return res.status(400).json({ error: "Invalid newsId" });
      // }
      let news;
      if (newsId) news = await newsModel.findById(newsId);
      else news = await newsModel.find().sort({ createdAt: -1 }).limit(50);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.status(200).json(generateResponse(200, "Fetched all news", news));
    } catch (error) {
      res.status(500).json(generateResponse(500, "Error in Finding news", error));
    }
  }
}

export default NewsController;
