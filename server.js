const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

app.get("/api/quotes", (req, res, next) => {
  let quotesFromAuthor = [];
  if (Object.keys(req.query).length === 0) {
    res.send({ quotes: quotes });
  } else if (Object.keys(req.query).length >= 1) {
    quotes.forEach((element) => {
      if (element.person === req.query.person) {
        quotesFromAuthor.push(element);
      }
    });
    res.send({ quotes: quotesFromAuthor });
  } else {
    res.status(404).send();
  }
});

app.post("/api/quotes", (req, res, next) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person,
  };
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`PORT is listening at ${PORT}`);
});
