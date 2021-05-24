'use strict';

require('dotenv').config(); // npm i dotenv
const express = require('express'); //npm i express
const weatherData = require('./data/weather.json')
const cors = require('cors');

const server = express();
server.use(cors()); //  make my server opened for anyone

// const PORT = 3001;
const PORT = process.env.PORT;


server.get('/', (req, res) => {
    res.send('home route')
})




server.get('/weather', (req, res) => {


let dataRes= req.query.searchQuery


let location = weatherData.find(item => {
  if(item.city_name === dataRes)
  {
    console.log(item.city_name)
    return item
    
  }

// console.log(item.city_name)
}



)



if(location)
{
res.send(location)
}


if(!location)
{
res.send(404)
}


})




server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
    // console.log(weatherData.length)

})