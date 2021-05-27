'use strict';

require('dotenv').config(); // npm i dotenv
const express = require('express'); //npm i express
const cors = require('cors');
const axios = require('axios');
const { Console } = require('console');


const server = express();
server.use(cors()); //  make my server opened for anyone

//Enviroment Variables.
const PORT = process.env.PORT;
let weatherKey = process.env.WEATHER_API_KEY;
let movieKey = process.env.MOVIE_API_KEY

//Routes
server.get('/', (req, res) => {
  res.send('home route')
})
server.get('/weather', HandleWeatherReq)
server.get('/movies', HandleMovieReq)


//Handling to Retrive Requested data (from user)
//By Fetching weatherbit third-party API using Axios Package
//
function HandleWeatherReq(req, res) {

  let dataRes = req.query.searchQuery
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${dataRes}&key=${weatherKey}`;

  axios
    .get(url)
    .then(result => {
      //will go out of .then .catch scoope and promise to back once the data is fetched and saved the result in result

      //loop over all the objects and save results as an object in the getData Array
      const getData = result.data.data.map(item => {
        return new Weather(item)

      })
      res.send(getData);
    })
    .catch(err => {
      res.status(500).send(`error in retrive the data ==> ${err}`);
    })
  //End of .then,.catch scoope..

}

function HandleMovieReq(req, res) {
  let movieName = req.query.searchQuery // Based on location , contains location
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieName}`;

  axios
    .get(url)
    .then(result => {
      //will go out of .then .catch scoope and promise to back once the data is fetched and saved the result in result

      //loop over all the objects and save results as an object in the getData Array
      const getData = result.data.results.map(item => {
    
  
        return new Movie(item);
      })
      // console.log(getData)
      res.send(getData);
    })
    .catch(err => {
      res.status(500).send(`error in retrive the data ==> ${err}`);
    })
  //End of .then,.catch scoope..

}


//Save retrived Data as objects.
class Weather {
  constructor(item) {
    this.date = item.datetime;
    this.description = item.weather.description;
  }
}


class Movie {
  constructor(item) {
    this.title = item.title
    this.overview = item.overview
    this.average_votes = item.vote_average
    this.total_votes = item.vote_count
    this.image_url = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
    this.popularity = item.popularity
    this.released_on = item.release_date
  }
}

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
  // console.log(weatherData.length)
})