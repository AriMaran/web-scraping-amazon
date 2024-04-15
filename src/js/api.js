const express = require("express");
const cors = require("cors");
const scrape = require("./amazonScraper");
const app = express();


// Enables CORS to allow requests from any origin and specifies which custom headers are allowed in the requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const port = 3000;

// Defines a route to perform web scraping based on a provided keyword and returns the results in JSON format
app.get("/api/scrape", async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ error: "Keyword required to perform web scraping." });
    }

    try {
        const products = await scrape(keyword);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Unable to perform web scraping on Amzon." });
    }
});

// "Starts the Express application server."
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
