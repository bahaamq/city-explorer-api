const axios = require('axios');

//Enviroment key Weather API
let weatherKey = process.env.WEATHER_API_KEY;

//Class Weather
class Weather {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;
    }


}
//End of class

HandleWeatherReq = (req, res) => {

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

module.exports = { Weather, HandleWeatherReq };