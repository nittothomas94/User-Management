const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//db connetion
require('./db');

const routes = require('./routes');
app.use('/api', routes);

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Page Not Found' });
});

app.listen(port, () => {
  console.log('App is Runnig');
});
