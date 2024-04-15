const axios = require("axios");
const cheerio = require("cheerio");

//Perform web scraping on Amazon based on a provided keyword.
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

        //It iterates over HTML elements on the Amazon page and extracts product information, storing it in variables.
        $(".s-result-item").each((index, element) => {
            let title = $(element).find("h2").text().trim();
            let rating = $(element).find(".a-icon-star-small").text().trim();
            let reviews = $(element).find(".a-size-small").first().text().trim();
            let image = $(element).find("img").attr("src");
            let price = $(element).find(".a-price .a-offscreen").text().trim();

            //Find price patterns within a string and stores the prices in an array
            const regex = /\$\d+(\.\d+)?/g;
            const prices = price.match(regex);

            /*Checks if the variable prices exists, if it contains values, and if there is only one price in the 
              prices array. If there is more than one, the prices are joined into a single string separated 
              by a hyphen*/
            if (prices) {
                if (prices.length === 1) {
                    price = prices[0];
                } else {
                    price = prices.join(" - ");
                }
            }
            
            /*Checks if both the title and the price of a product are different from an empty
              string to avoid fetching unnecessary information*/
            if (title !== "" && price )
                products.push({
                    title,
                    rating,
                    reviews,
                    price,
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
