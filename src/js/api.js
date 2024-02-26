const express = require("express");
const scrape = require("./amazoncheerio");
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
