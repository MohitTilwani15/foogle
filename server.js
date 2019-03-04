const path = require('path');
const express = require('express');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static('dist'));

//Express will serve up index.html file if it doesn't recognisze the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port);
