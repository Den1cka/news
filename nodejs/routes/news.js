var express = require('express');
var router = express.Router();

// sample of news-json object
let sample = {
  "author": "Default Author",
  "title": "Default Title",
  "description": "Default Description",
  "content": "Default Content"
}

// local "storage" of news
let news = [];

// GET request - get whole list of objects (including nulls)
router.get('/', (req, res, next) => {
  res.json(news);
});

// GET request - get object by id
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  let obj = news[id];

  if (obj === undefined) {
    return next(new Error("Record does not exist!"));
  }

  res.json(obj);
});

// POST request - post new object
router.post('/', (req, res, next) => {
  let obj = req.body;
  let id = news.push(obj) - 1;
  res.json(id);
});

// PUT request - put an object by id
router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let obj = req.body;

  if (news[id] === undefined) {
    return next(new Error("Record does not exist!"));
  }

  news[id] = obj;
  res.json(id);
});

// DELETE request - delete the object by id
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  if (news[id] === undefined) {
    return next(new Error("Record does not exist!"));
  }

  news[id] = null;
  res.json(id);
});

// default response to any other requests
router.use(function (req, res, next) {
  res.json(sample);
});

module.exports = router;
