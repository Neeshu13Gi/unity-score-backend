// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your real connection string
mongoose.connect('mongodb+srv://neeshu:YC7pQ0Unf32NKHi7@neeshu.cwxzomm.mongodb.net/UnityBackend?retryWrites=true&w=majority&appName=neeshu');

const Player = mongoose.model('Player', {
  username: String,
  score: Number,
});

app.post('/submit', async (req, res) => {
  const { username, score } = req.body;
  const newPlayer = new Player({ username, score });
  await newPlayer.save();
  res.send('Score saved');
});

app.get('/scores', async (req, res) => {
  const scores = await Player.find().sort({ score: -1 }).limit(10);
  res.json(scores);
});

app.get('/', (req, res) => {
  res.send("Unity + MongoDB API is live!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
