const express = require('express');
const mongoose = require('mongoose');
const Coin = require('./models/Coin'); 

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@db.bdboune.mongodb.net/?retryWrites=true&w=majority&appName=DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

