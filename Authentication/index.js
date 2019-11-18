const express = require('express')
const app = express()
//import the route
const authRoute = require('./auth');
//route middlewire
app.use('/api/user', authRoute);
app.listen(5000, () => console.log('server runing now'));