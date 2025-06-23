const express = require('express');
const cors = require('cors');
const math = require('mathjs');
const { evaluate } = math;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression || typeof expression !== 'string') {
      return res.status(400).json({ error: 'Invalid input: expression is required' });
    }

    const result = evaluate(expression);
    res.json({ result });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(400).json({ error: 'Error evaluating expression' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});