require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');
const app = express();

// Enable CORS for the frontend origin
app.use(cors({
  origin: 'https://congenial-space-broccoli-55jr74wwpvwc4964-3001.app.github.dev',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;

console.log('API Key:', API_KEY);
console.log('API Secret:', API_SECRET);

app.get('/get-token', async (req, res) => {
  const { roomName, participantName } = req.query;
  if (!roomName || !participantName) {
    return res.status(400).json({ error: 'roomName and participantName required' });
  }
  if (!API_KEY || !API_SECRET) {
    return res.status(500).json({ error: 'API key or secret not configured' });
  }
  try {
    const token = new AccessToken(API_KEY, API_SECRET, {
      identity: participantName,
    });
    token.addGrant({ roomJoin: true, room: roomName });
    const jwt = await token.toJwt();
    console.log('Generated Token:', jwt);
    res.json({ token: jwt });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));