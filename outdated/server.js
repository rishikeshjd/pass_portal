nst express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors()); // Allow requests from any origin (for now)
app.use(bodyParser.json()); // To parse JSON body from requests

app.post('/save-feedback', (req, res) => {
  console.log('Received data:', req.body);  // This will print received data in your terminal

  const filePath = path.join(__dirname, 'submitted-feedback.json');

  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to save file' });
    }
    res.json({ status: 'success', message: 'Data saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
