
require('dotenv').config();
const express = require('express');

const hostname = '127.0.0.1';
const port = process.env.PORT || 4000;

const mongoose = require('mongoose');
const app = express();

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING || '';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('Error details:', err);
  });

// Middleware to parse JSON bodies
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Note Schema
const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 100
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  reports: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const authenticate = async (req, res, next) => {

  next();
};


const Note = mongoose.model('facts', noteSchema);


// GET all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    console.log(notes);
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new note
app.post('/api/notes', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const note = new Note({ text });
    const savedNote = await note.save();
    res.status(201).json({ status: 201, data: savedNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
