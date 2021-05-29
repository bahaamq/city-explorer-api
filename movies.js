const axios = require('axios');

let inMemory = {};


//Enviroment key Weather API
let movieKey = process.env.MOVIE_API_KEY
//Class Movie 
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
}// End of Class


 HandleMovieReq = (req, res) =>  {
    let movieName = req.query.searchQuery // Based on location , contains location
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieName}`;

    if(inMemory[movieName] !== undefined)
    {
      console.log('test sound 2')
        res.send(inMemory[movieName])
    }

    else
    {

    axios
        .get(url)
        .then(result => {
            //will go out of .then .catch scoope and promise to back once the data is fetched and saved the result in result

            //loop over all the objects and save results as an object in the getData Array
            const getData = result.data.results.map(item => {

                return new Movie(item);
            })
            inMemory[movieName] = getData
            res.send(getData);
        })
        .catch(err => {
            res.status(500).send(`error in retrive the data ==> ${err}`);
        })
    //End of .then,.catch scoope..

}
 }

module.exports = { Movie, HandleMovieReq };