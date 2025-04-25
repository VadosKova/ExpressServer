const express = require('express');
const Coin = require('../models/Coin');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');


router.get('/coins', async (req, res) => {
  try {
    const coins = await Coin.find();
    res.json(coins);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/coins/:id', async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) return res.status(404).send('Coin not found');
    res.json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/coins', verifyToken, async (req, res) => {
  try {
    const { name, material, country, year, price } = req.body;
    const coin = new Coin({ name, material, country, year, price });
    await coin.save();
    res.status(201).json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/coins/:id', verifyToken, async (req, res) => {
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

router.delete('/coins/:id', verifyToken, async (req, res) => {
  try {
    const coin = await Coin.findByIdAndDelete(req.params.id);
    if (!coin) return res.status(404).send('Coin not found');
    res.json({ message: 'Coin deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;