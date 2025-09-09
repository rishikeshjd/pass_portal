import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/schedule', (req, res) => {
  const dataPath = path.resolve('data.json'); // Ensure this points correctly to your data.json file

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read data.json:', err);
      return res.status(500).json({ error: 'Failed to load schedule data' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Failed to parse data.json:', parseError);
      res.status(500).json({ error: 'Invalid JSON format in data file' });
    }
  });
});

export default router;



