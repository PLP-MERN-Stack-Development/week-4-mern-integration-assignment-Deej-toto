const itemsRouter = require('./routes/items');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Test route
app.get('/', (req, res) => res.send('API running'));

app.use('/api/items', itemsRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
