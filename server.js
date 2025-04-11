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


app.get('/coins/:id', async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) return res.status(404).send('Coin not found');
    res.json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/coins', async (req, res) => {
  try {
    const { name, material, country, year, price } = req.body;
    const coin = new Coin({ name, material, country, year, price });
    await coin.save();
    res.status(201).json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});