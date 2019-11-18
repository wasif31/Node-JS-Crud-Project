const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import the route
const authRoute = require('./auth');
//route middlewire
dotenv.config();
// Connecting to Database
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connected to db')
);
app.use('/api/user', authRoute);
app.listen(5000, () => console.log('server runing now'));