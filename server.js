'use strict';
//Configration
require('dotenv').config(); // npm i dotenv
const express = require('express'); //npm i express
const cors = require('cors');
const axios = require('axios');
const {Weather,HandleWeatherReq} = require('./weather.js')
const {Movie,HandleMovieReq} = require('./movies.js')
const server = express();
server.use(cors()); //  make my server opened for anyone
//Enviroment Variable.
const PORT = process.env.PORT;
//End of configuration

//Routes
server.get('/weather', HandleWeatherReq)
server.get('/movies', HandleMovieReq)

//Home
server.get('/', (req, res) => {
  res.send('home route')
})
//End of Routes


//Server Setup
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
  // console.log(weatherData.length)
})