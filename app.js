const express = require('express');
const app = express();
const pool = require('./database').pool;

app.get('/', (req, res) => {
  //   display all endpoints
  res.send(
    'Welcome to the Task API \n\n' +
      'Endpoints: \n' +
      '/tasks \n' +
      '/tasks/:id \n' +
      '/tasks \n' +
      '/tasks/:id \n' +
      '/tasks/:id \n'
  );
});

// Console output to open the browser
console.log('Open http://localhost:3000 in your browser');

// connection to the database
const { poolConnect } = require('./database');

poolConnect
  .then(() => {
    console.log('Connected to MSSQL Database ');
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

//  get /tasks endpoint to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM TaskTable');
    res.send(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// get /tasks/:id endpoint to get a single task
app.get('/tasks/:id', async (req, res) => {
  try {
    const result = await pool
      .request()
      .input('input_parameter', req.params.id)
      .query('SELECT * FROM TaskTable WHERE Id = @input_parameter');

    res.send(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// post /tasks endpoint to create a new task
app.post('/tasks', async (req, res) => {
  try {
    const result = await pool
      .request()
      .input('input_parameter', req.body.name)
      .query('INSERT INTO TaskTable (Name) VALUES (@input_parameter)');
    res.send(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// put /tasks/:id endpoint to update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const result = await pool
      .request()
      .input('input_parameter', req.body.name)
      .input('input_parameter2', req.params.id)
      .query(
        'UPDATE TaskTable SET Name = @input_parameter WHERE Id = @input_parameter2'
      );
    res.send(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// delete /tasks/:id endpoint to delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await pool
      .request()
      .input('input_parameter', req.params.id)
      .query('DELETE FROM TaskTable WHERE Id = @input_parameter');
    res.send(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
