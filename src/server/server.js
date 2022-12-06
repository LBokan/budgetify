const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();
const PORT = 5000;

mongoose.connect(
  'mongodb+srv://LBokan:Pass123@cluster0.kx0ghkz.mongodb.net/SmartHome',
  {
    useNewUrlParser: true
  }
);

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to database'));

app.listen(PORT, (error) =>
  error
    ? console.log(error)
    : console.log(`Server started at http://localhost:${PORT}/graphql`)
);
