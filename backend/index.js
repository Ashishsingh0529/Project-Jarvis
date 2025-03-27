const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// In-memory storage
const elevators = {
  elevator1: { id: 'elevator1', capacity: 8, currentOccupancy: 0, floor: 1 },
  elevator2: { id: 'elevator2', capacity: 8, currentOccupancy: 0, floor: 1 }
};

// Routes
app.get('/api/elevators', (req, res) => {
  res.json(Object.values(elevators));
});

app.post('/api/elevators/:id/occupancy', (req, res) => {
  const { id } = req.params;
  const { occupancy } = req.body;
  
  if (!elevators[id]) {
    return res.status(404).json({ error: 'Elevator not found' });
  }

  elevators[id].currentOccupancy = Math.max(0, Math.min(occupancy, elevators[id].capacity));
  res.json(elevators[id]);
});

app.post('/api/elevators/:id/floor', (req, res) => {
  const { id } = req.params;
  const { floor } = req.body;
  
  if (!elevators[id]) {
    return res.status(404).json({ error: 'Elevator not found' });
  }

  elevators[id].floor = floor;
  res.json(elevators[id]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 