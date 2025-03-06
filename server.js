// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/video-status', (req, res) => {
    fs.stat(path.join(__dirname, 'public', 'index.html'), (err, stats) => {
        if (err) {
            return res.status(500).json({ updated: false });
        }
        res.json({ updated: stats.mtimeMs });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
