const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');

// configuration
dotenv.config();
app.use(express.json());

// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection is successful!'))
  .catch(error => console.log(error));

// api
app.use('/api/auth/', authRoute);
app.use('/api/users/', userRoute);
app.use('/api/movies/', movieRoute);
app.use('/api/lists/', listRoute);

// create server
app.listen(8800, () => {
  console.log('Backend server is running!');
});