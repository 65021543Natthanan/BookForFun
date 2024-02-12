const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'bookforfun',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Middleware to parse JSON data
app.use(express.json());

app.use(express.static(path.join(__dirname, 'SearchGame')));

app.get('/api/games', (req, res) => {
    const sql = 'SELECT * FROM games';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

app.get('/search', (req, res) => {
    const searchTerm = req.query.term;
  
    // Perform a simple search query
    const query = `SELECT * FROM games WHERE G_nameTH LIKE '%${searchTerm}%' OR G_nameEN LIKE '%${searchTerm}%'`;
  
    db.query(query, (err, results) => {
      if (err) throw err;
  
      res.json(results);
    });
});



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'SearchGame', 'SearchGame.html'));
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
