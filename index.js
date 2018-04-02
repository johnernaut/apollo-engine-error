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
  appId: 'P31L0UZ00Q',
  apiKey: 'c8da3d594cd028ab0af87085e23e7bce',
  indexName: 'books'
});

BookSchema.syncWithAlgolia();

const PORT = 3000;

const app = express();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
