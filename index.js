const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// Connect to database
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json({ extended: false }));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));