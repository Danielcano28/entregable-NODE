const Movie = require('../models/Movie')
const Genre =  require('../models/Genre')
const Actor =  require('../models/Actor')
const Director =  require('../models/Director')

Genre.belongsToMany(Movie,{through: 'moviesGenres'})
Movie.belongsToMany(Genre,{through: 'moviesGenres'})


Director.belongsToMany(Movie,{through: 'moviesDirectors'})
Movie.belongsToMany(Director,{through: 'moviesDirectors'})


Actor.belongsToMany(Movie,{through: 'moviesActors'})
Movie.belongsToMany(Actor,{through: 'moviesActors'})