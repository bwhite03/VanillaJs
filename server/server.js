const express = require('express');
const cors = require('cors');

// const data = require('./data');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = {
  user: 'express',
  password: 'express',
  server: `LOCALHOST`,
  database: 'express',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

app.delete('/products', (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.send({ error: 2, success: false, msg: 'Missing Id' });
      return;
    }
    var sql = require('mssql');
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      const query = 'delete from items where id = ' + id;
      request.query(query, function (err, recordset) {
        if (err) console.log(err);
        res.send({ error: 0, success: true, data: recordset });
      });
    });
  } catch (error) {
    res.send({ error: 1, success: true, msg: error.msg });
  }
});

app.post('/products', (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      res.send({ error: 2, success: false, msg: 'Missing Name Parameter' });
      return;
    }
    const { size, price, category } = req.body;
    console.log(name, size, price, category);
    var sql = require('mssql');
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      const query = `insert into items (name, size, price, category) values ('${name}', '${size}', '${price}', '${category}')`;
      request.query(query, function (err, recordset) {
        if (err) console.log(err);
        res.send({ error: 0, success: true, data: recordset });
      });
    });
  } catch (error) {
    res.send(res.send({ error: 1, success: true, msg: error.message }));
  }
});

app.get('/products', (req, res) => {
  try {
    var sql = require('mssql');

    sql.connect(config, function (err) {
      if (err) console.log(err);

      var request = new sql.Request();

      request.query(
        'select items.id, items.name, size, price, categories.name as category from items left join.categories on items.category = categories.id',
        function (err, recordset) {
          if (err) console.log(err);

          res.send({ error: 0, success: true, data: recordset.recordset });
        }
      );
    });
  } catch (error) {
    res.send({ error: 1, success: false, msg: error.message });
  }
});

app.get('/categories', (req, res) => {
  try {
    var sql = require('mssql');
    sql.connect(config, function (err) {
      if (err) console.log(err);

      var request = new sql.Request();
      request.query('select * from categories', function (err, recordset) {
        if (err) console.log(err);
        res.send({ error: 0, success: true, data: recordset.recordset });
      });
    });
  } catch (error) {
    res.send({ error: 1, success: true, msg: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
