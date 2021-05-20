const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const property = require('./server/routes/property')
const Latestproperty = require('./server/routes/Latestproperty')
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//create a GET route
app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.use('/property',property);
app.use('/Latestproperty',Latestproperty);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

