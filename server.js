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
  let location=0;
try
{
let dataRes= req.query.searchQuery

location = weatherData.find(item => {
  if(item.city_name === dataRes)
  {
    
    return item
  }
}

)

let date;
let description;
let dataobj;
let dataArr=[];

location=location.data
for(let i=0 ; i < weatherData.length;i++)
{
date=location[i].datetime
description=`Low of  ${location[i].low_temp} , high of ${location[i].high_temp} with ${location[i].weather.description}`
console.log(date)
console.log(description)
dataobj  = new Forecast(date, description);
console.log(dataobj)
dataArr.push(dataobj)
}
// console.log(dataArr) 
res.send(dataArr)
}
catch
{
  res.send('err')
}


})

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
    // console.log(weatherData.length)

})