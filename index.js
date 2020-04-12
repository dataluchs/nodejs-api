const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'));

mongoose.connection.on('error', (err) => {
  console.log(`Error: ${err.message}`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
