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

app.put('/coins/:id', async (req, res) => {
  try {
    const { name, material, country, year, price } = req.body;
    const coin = await Coin.findByIdAndUpdate(
      req.params.id,
      { name, material, country, year, price },
      { new: true }
    );
    if (!coin) return res.status(404).send('Coin not found');
    res.json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/coins/:id', async (req, res) => {
  try {
    const coin = await Coin.findByIdAndDelete(req.params.id);
    if (!coin) return res.status(404).send('Coin not found');
    res.json({ message: 'Coin deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});