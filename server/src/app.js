const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./controller/controller');

const app = express();

app.use(
  cors({
    // origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.use('/user', route);

app.use((er, req, res, _next) => res.send(er.message));

module.exports = { app };
