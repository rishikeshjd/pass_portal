const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST /send-request
router.post('/send-request', (req, res) => {
  const requestData = req.body;

  if (!requestData || !requestData.commands) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const filePath = path.join(__dirname, '../../Request_Master.txt');

  const content = `
==== New Command Request ====
Time: ${new Date().toISOString()}
Commands: ${requestData.commands.join(', ')}
Full Payload: ${JSON.stringify(requestData, null, 2)}

`;

  fs.appendFile(filePath, content, (err) => {
    if (err) {
      console.error('Failed to write request:', err);
      return res.status(500).json({ error: 'Failed to save request' });
    }
    return res.json({ message: 'Request saved successfully' });
  });
});

module.exports = router;


