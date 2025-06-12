import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

// Basic /hello route
app.get('/hello', (req, res) => {
  res.send('Hello World from Express Server!');
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files from the React app's build directory
  app.use(express.static(path.join(__dirname, '../../ReactClient/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ReactClient/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 