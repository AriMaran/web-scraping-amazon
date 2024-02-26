const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeAmazon(keyword) {
    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,/;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                "Referer": "https://www.amazon.com/",
                "Alt-Used": "www.amazon.com",
                "Connection": "keep-alive"
            }
        });
        const html = response.data;
        const $ = cheerio.load(html);

        const products = [];

        $(".s-result-item").each((index, element) => {
            const title = $(element).find("h2").text().trim();
            const rating = $(element).find(".a-icon-star-small").text().trim();
            const reviews = $(element).find(".a-size-small").first().text().trim();
            const image = $(element).find("img").attr("src");
            if (title !== "")
                products.push({
                    title,
                    rating,
                    reviews,
                    image
                });
        });

        return products;
    } catch (error) {
        console.error("Error scraping Amazon:", error);
        throw error;
    }
}

module.exports = scrapeAmazon;
