const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
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

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// import routes
const user = require('./routes/user');

// use routes
app.use('/api/user', user);

// server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
