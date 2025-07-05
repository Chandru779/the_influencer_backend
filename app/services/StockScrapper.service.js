import axios from 'axios';
// import cheerio from 'cheerio';

export async function fetchStockNews(fromPage) {
  try {
    const { data } = await axios.get(fromPage);
    // const $ = cheerio.load(data);

    const newsItems = [];

    // $('.eachStory').each((i, el) => {
    //   const headline = $(el).find('h3 a').text().trim();
    //   const link = 'https://economictimes.indiatimes.com' + $(el).find('h3 a').attr('href');

    //   if (headline && link) {
    //     newsItems.push({ headline, link });
    //   }
    // });

    return newsItems;
  } catch (err) {
    console.error('Error fetching stock news:', err.message);
    return [];
  }
}