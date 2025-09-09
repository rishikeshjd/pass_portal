mport express from 'express';
import fs from 'fs';
import path from 'path';
import scheduleRouter from './routes/schedule.js';  // Adjust the path if needed

const app = express();
const PORT = 8080;

// Middleware to parse JSON body
app.use(express.json());

// Existing POST /send-request route
app.post('/send-request', (req, res) => {
  console.log('Received /send-request POST:', req.body);
  try {
    const requestData = req.body.data?.attributes;
    if (!requestData || !requestData.commands) {
      console.log("Invalid payload:", requestData);
      return res.status(400).json({ error: 'Invalid request payload' });
    }
    const filePath = path.resolve('Request_Master.txt');
    const content = `
==== New Command Request ====
Time: ${new Date().toISOString()}
User: ${requestData.user || 'Unknown'}
Commands: ${requestData.commands.join(', ')}
Full Payload: ${JSON.stringify(requestData, null, 2)}
`;
    fs.appendFile(filePath, content, (err) => {
      if (err) {
        console.error('Failed to write request:', err);
        return res.status(500).json({ error: 'Failed to save request' });
      }
      console.log('Request saved successfully to file');
      return res.json({ message: 'Request saved successfully' });
    });
  } catch (error) {
    console.error('Exception in /send-request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// NEW GET /api/dashboard-stats route - sample stats
app.get('/api/dashboard-stats', (req, res) => {
  const dashboardData = {
    totalRequests: 120,    // example data, update with real data later
    upcomingPasses: 8,
    alerts: 2,
  };
  res.json(dashboardData);
});

// Add GET /api/schedule route to read and serve data.json
app.get('/api/schedule', (req, res) => {
  const dataPath = path.join(process.cwd(), 'data.json'); // Use process.cwd() to locate root backend folder
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ error: 'Failed to load schedule data' });
    }
    try {
      const schedule = JSON.parse(data);
      res.json(schedule);
    } catch (parseErr) {
      console.error('Error parsing data.json:', parseErr);
      res.status(500).json({ error: 'Invalid schedule data format' });
    }
  });
});

// Mount the schedule routes under /api
app.use('/api', scheduleRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});


