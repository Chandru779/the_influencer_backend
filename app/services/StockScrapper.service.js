import axios from "axios";
import * as cheerio from "cheerio";
import { stockKeywords } from "../constants/app.constants.js";

export async function fetchStockNews(fromPage) {
  try {
    return fetchEconomicTimesNews();
  } catch (err) {
    console.error("Error fetching stock news:", err.message);
    return [];
  }
}

const containsStockKeyword = (text) => {
  return stockKeywords.some((keyword) =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const fetchEconomicTimesNews = async () => {
  try {
    console.log("Crawling entry...");
    const { data } = await axios.get(
      "https://www.tickertape.in/news-events"
    );
    const $ = cheerio.load(data);
    console.log("Crawling Response...");

    const results = [];
    // Dynamically extract the hostname from the URL
    const url = "https://www.tickertape.in/news-events";
    const { hostname } = new URL(url);
    const source = hostname.replace('www.', '').split('.')[0]; // e.g., 'tickertape'
    const sourceUrl = url;

    // Select all div and p tags
    $("div, p").each((i, el) => {
      // Only process <p> tags to reduce duplicates and irrelevant divs

      // Avoid duplicates by checking if this text is already in results
      const text = $(el).text().trim();
      const tagName = $(el)[0]?.tagName;

      // Only process <p> or <div> tags with meaningful text
      if (
        (tagName === "p" || tagName === "div") &&
        text &&
        text.length > 30 && // filter out very short lines
        containsStockKeyword(text) &&
        !results.some((item) => item.line === text) // avoid duplicates
      ) {
        // Clean up extra spaces and fix merged words
        let cleanedText = text
           // collapse multiple spaces and fix cropped beginnings
           .replace(/^[^a-zA-Z0-9]+/, "") // remove non-alphanumeric chars from start (fix cropped beginnings)
          .replace(/([a-z])([A-Z])/g, "$1 $2") // add space between merged words (e.g., "marketUpdate" -> "market Update")
          .trim();

        // Try to find a link inside the tag, if any
        const link = $(el).find("a").attr("href");
        // Find all exact keyword matches in the cleanedText
        const matchedKeywords = stockKeywords.filter((keyword) =>
          cleanedText.toLowerCase().split(/\W+/).includes(keyword.toLowerCase())
        );

        // Only proceed if there is at least one exact keyword match
        if (matchedKeywords.length > 0) {
          // Slice the text around the first matched keyword for context
          const keyword = matchedKeywords[0];
          const regex = new RegExp(`(.{0,60})\\b${keyword}\\b(.{0,60})`, "i");
          const match = cleanedText.match(regex);
          // Try to extract a meaningful sentence around the keyword
          let context;
          if (match && match[0]) {
            context = match[0].trim();
          } else {
            // Fallback: slice up to 200 chars, but cut at the last full stop, exclamation, or question mark before 200
            const slice = cleanedText.slice(0, 200);
            const lastPunct = Math.max(
              slice.lastIndexOf("."),
              slice.lastIndexOf("!"),
              slice.lastIndexOf("?")
            );
            if (lastPunct > 50) {
              context = slice.slice(0, lastPunct + 1).trim();
            } else {
              // If no punctuation found, just use the slice
              context = slice.trim();
            }
          }

          // Avoid duplicates by checking if context is already in results
          if (!results.some((item) => item.line === context)) {
            results.push({
              info: context,
              source: source,
              sourceLink: link
              ? link.startsWith("http")
                ? link
                : `https://www.moneycontrol.com${link}`
              : 'https://www.moneycontrol.com',
              scrapedAt: new Date(),
                // Mark as unverified news
                newsStatus: "unverified",
                newsSourceMethod: "automated" 
            });
          }
        }
      }
    });
    return results;
  } catch (err) {
    console.error("❌ Error scraping Economic Times:", err.message);
    return [];
  }
};
