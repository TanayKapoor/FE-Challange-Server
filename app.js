const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const options = require('./swaggerOptions');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJsdoc(options);
const tasks = require('./routes/tasks');

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/tasks', tasks);

// Console output to open the browser
console.log('Open http://localhost:3000 in your browser');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
