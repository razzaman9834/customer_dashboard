const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });


//for demo purpose I havent use .env 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Sublime',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});


db.query(
  'CREATE TABLE IF NOT EXISTS customers (id INT PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), city VARCHAR(255), company VARCHAR(255))',
  (err) => {
    if (err) {
      console.error('Error creating customers table: ' + err.message);
    } else {
     
      console.log("Working fine");
    }
  }
);


app.get('/api/customers', (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  const query =
    'SELECT * FROM customers WHERE first_name LIKE ? OR last_name LIKE ? OR city LIKE ? LIMIT ? OFFSET ?';
  const params = [`%${search}%`, `%${search}%`, `%${search}%`, parseInt(limit), offset];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});


app.get('/api/customers/:id', (req, res) => {
  const customerId = req.params.id;

  db.query('SELECT * FROM customers WHERE id = ?', customerId, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.message);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      res.status(404).send('Customer not found');
    } else {
      res.json(results[0]);
    }
  });
});


app.get('/api/cities', (req, res) => {
  db.query('SELECT city, COUNT(*) as customer_count FROM customers GROUP BY city', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.put('/api/customers/:id', upload.single('file'), (req, res) => {
    const customerId = req.params.id;
    console.log(customerId);
    const { first_name, last_name, city, company } = req.body;
  
  
    const updateQuery = `
      UPDATE customers
      SET first_name = ?, last_name = ?, city = ?, company = ?
      WHERE id = ?
    `;
  
    const values = [first_name, last_name, city, company, customerId];

    console.log(updateQuery, values);


    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating customer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log(result);
        res.json({ message: 'Customer updated successfully' });
      }
    });
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
