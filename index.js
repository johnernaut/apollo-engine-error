const express = require('express');
const mongoose = require('mongoose');
const mongoolia = require('mongoolia').default;

mongoose.Promise = global.Promise;
mongoose.connection.on(
  'error',
  console.error.bind(console, 'Error connecting to mongo: ')
);

mongoose.connection.on('connected', error => {
  console.log('Connected to MongoDB at localhost.');
});

mongoose.connect(`mongodb://localhost:27017`);

const BookSchema = new mongoose.Schema({
  title: {type: String, required: true, algoliaIndex: true},
  author: {type: String, required: true, algoliaIndex: true},
  description: {type: String, required: true, algoliaIndex: true}
});

BookSchema.plugin(mongoolia, {
  appId: '<your id>',
  apiKey: '<your api key>',
  indexName: 'books'
});

BookSchema.syncWithAlgolia();

const PORT = 3000;

const app = express();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
