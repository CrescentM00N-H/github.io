import express from 'express';
import path from 'path';
const app = express();
// Serve static files
app.use(express.static(path.join(__dirname, '../..')));
// SPA entry point
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../..', 'index.html')));
// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
