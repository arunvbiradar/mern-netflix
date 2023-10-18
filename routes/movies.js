// ./routes/movie.js
const Movie = require('../models/Movie');
const { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

// create movie
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get all movies
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const newMovies = req.query.new;
  try {
    const movies = newMovies ? await Movie.find().sort({_id:-1}).limit(2) : await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
})

// get a movie
router.get('/find/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get a random movie for featured
router.get('/random', async(req, res) => {
  const type = req.query.type;
  let movie;
   try {
    if(type === 'series') {
      movie = await Movie.aggregate([
        {$match: {isSeries: true}},
        {$sample: {size: 1}}
      ])
    } else {
      movie = await Movie.aggregate([
        {$match: {isSeries: false}},
        {$sample: {size: 1}}
      ])
    }
    
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
})

// update a movie
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: req.body
      },
      {new: true}
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json('Movie has been deleted!');
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;