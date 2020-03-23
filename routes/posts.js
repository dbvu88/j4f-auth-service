require('dotenv').config()
const db = require("../db")
const knex = require('../knexfile')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const columns = [
    'posts.text',
    { meaningEng: 'posts.meaningE' },
    { meaningVie: 'posts.meaningV' },
    { exampleEng: 'posts.exampleE' },
    { exampleVie: 'posts.exampleV' },
    { source: 'posts.sourceUrl' },
    { lastUpdate: 'posts.updated_at' },
    { user: 'users.username' }
]
const getPostsByUser = async ({ user }) => await db('posts')
    .join('users', 'posts.userid', '=', 'users.id')
    .where('username', user)
    .select(columns)
    .limit(50)
    .then(data => {
        console.log(data)
        return data
    })
    .catch(err => { throw err })

const getPosts = async () => await db('posts')
    .join('users', 'posts.userid', '=', 'users.id')
    .select(columns)
    .limit(50)
    .then(data => {
        console.log(data)
        return data
    })
    .catch(err => { throw err })

const createPost = async (post) => await db('posts')
    .returning([
        'posts.text',
        { meaningEng: 'posts.meaningE' },
        { meaningVie: 'posts.meaningV' },
        { exampleEng: 'posts.exampleE' },
        { exampleVie: 'posts.exampleV' },
        { source: 'posts.sourceUrl' },
        { lastUpdate: 'posts.updated_at' }
    ])
    .insert(post)
    .then(data => {
        console.log(data)
        return data
    })
    .catch(err => { throw err })


router
    .get('/', async (req, res, next) => {
        if (req.headers.authorization !== process.env.AUTH) {
            res.status(401).json({ message: "no authorization" })
            return;
        }
        try {
            const data = await getPosts()
            res.json(data)
        } catch (err) {
            next(err)
        }
    })
    .get('/:user', async (req, res, next) => {
        if (req.headers.authorization !== process.env.AUTH) {
            res.status(401).json({ message: "no authorization" })
            return;
        }
        try {
            const data = await getPostsByUser(req.params)
            res.json(data)
        } catch (err) {
            next(err)
        }
    })
    .post('/', async (req, res, next) => {
        console.log(req)
        if (req.headers.authorization !== process.env.AUTH) {
            res.status(401).json({ message: "no authorization" })
            return;
        }
        try {
            const data = await createPost(req.body)
            if (data.rowCount)
                console.log(req)
            res.json(data)
        } catch (err) {
            next(err)
        }
    })

module.exports = router;
