const { InMemmory } = require("./InMemmory");
const db = require("../db")
var express = require('express');
var router = express.Router();
/* GET users listing. */
router
  .get('/', async (req, res, next) => {
    await db('usersTemp')
      .then(data => res.json(data))
      .catch(next)
  })
  .get('/:id', async (req, res, next) => {
    await db('usersTemp')
      .where('id', req.params.id)
      .then(data => {
        if (data.length === 0) {
          res.status(404).json({ message: 'User Not Found' })
        }
        res.json(data)
      })
      .catch(next)
  })
  .post('/', async (req, res, next) => {
    await db('usersTemp')
      .insert(req.body)
      .then(data => {
        if (data.rowCount === 0) {
          res.status(406).json({ message: 'User Not Created' })
        }
        res.json({ message: 'User Created' })
      })
      .catch(next)
  })
  .put('/:id', async (req, res, next) => {
    await db('usersTemp')
      .where('id', req.params.id)
      .update(req.body)
      .then(data => {
        console.log(data)
        if (data === 0) {
          res.status(406).json({ message: 'User Not Updated' })
        }
        res.json({ message: 'User Updated' })
      })
      .catch(next)
  })
  .delete('/:id', async (req, res, next) => {
    await db('usersTemp')
      .where('id', req.params.id)
      .del()
      .then(data => {
        console.log(data)
        if (data === 0) {
          res.status(404).json({ message: 'User Not Found' })
        }
        res.json({ message: 'User Removed' })
      })
      .catch(next)
  });

module.exports = router;
