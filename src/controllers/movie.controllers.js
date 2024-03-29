const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre =  require('../models/Genre')
const Actor =  require('../models/Actor')
const Director =  require('../models/Director')



const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({ include: [Genre, Actor, Director] });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, { include: [Genre, Actor, Director] });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenre = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)

    if (!movie) return res.sendStatus(404)

    await movie.setGenre(req.body)
    const genre = await movie.getGenre()

    return res.json(genre)

})

const setActor = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)

    if (!movie) return res.sendStatus(404)

    await movie.setActor(req.body)
    const actor = await movie.getActor()

    return res.json(actor)

})

const setDirector = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)

    if (!movie) return res.sendStatus(404)

    await movie.setDirector(req.body)
    const director = await movie.getDirector()

    return res.json(director)

})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenre,
    setActor,
    setDirector
}