// ./routes/list.js
const List = require('../models/List');
const { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

// create list
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newList = new List(req.body);
  try {
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get all lists
router.get('/', verifyToken, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  try {
    let lists = [];
    if (typeQuery) {
      if (genreQuery) {
        lists = await List.aggregate([
          {$sample: {size: 10}},
          {$match: {type: typeQuery, genre: genreQuery}}
        ]);
      } else {
        lists = await List.aggregate([
          {$sample: {size: 10}},
          {$match: {type: typeQuery}}
        ]);
      }
    } else {
      lists = await List.aggregate([{$sample: {size: 10}}]);
    }
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get a list
router.get('/find/:id', async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get a random list for featured
router.get('/random', async(req, res) => {
  const type = req.query.type;
  let list;
   try {
    if(type === 'series') {
      list = await List.aggregate([
        {$match: {isSeries: true}},
        {$sample: {size: 1}}
      ])
    } else {
      list = await List.aggregate([
        {$match: {isSeries: false}},
        {$sample: {size: 1}}
      ])
    }
    
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
})

// update a list
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, {
        $set: req.body
      },
      {new: true}
    );
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json('List has been deleted!');
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;