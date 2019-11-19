const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import the route
const authRoute = require('./auth');
const postRoute = require('./posts');
//route middlewire
dotenv.config();
// Connecting to Database
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connected to db')
);

// Middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('api/posts', postRoute)
app.listen(4000, () => console.log('server runing now'));