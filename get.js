const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'workplace',
  password: 'Parkavi@19',
  port: 5432,
});

app.get('/gettingValues', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM db');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

