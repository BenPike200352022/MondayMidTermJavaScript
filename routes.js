// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const metahumanRoutes = require('./routes/metahumans');

// Our home page
app.get('/', (req, res) => {
  res.render('pages/home');
});

// Your route file for your metahuman
app.use('/metahumans', metahumanRoutes);

// Exporting the changes
module.exports = app;