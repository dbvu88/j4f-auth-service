const db = require("../db")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const getUser = async username => await db('users')
    .where('username', username)
    .then(data => { return data })
    .catch(err => { throw err })


router
    .get('/:username', async (req, res, next) => {
        try {
            const data = await getUser(req.params.username)
            res.json(data[0].username)
        } catch (err) {
            next(err)
        }
    })
    .post('/login', async (req, res, next) => {
        const failedMsg = 'You may have entered a wrong username or password'
        const { username, role, password } = req.body
        if (!username || !password) {
            res.status(400).json({ message: 'Bad Request!' })
        }

        try {
            const data = await getUser(username)
            let correctPassword = false

            if (data.length > 0) {
                correctPassword = bcrypt.compareSync(password, data[0].password)
            }

            if (correctPassword) {
                res.json({ username, role })
                return;
            }
        } catch (err) {
            next(err)
        }

        res.status(400).json({ message: failedMsg })

    })
    .post('/signup', async (req, res, next) => {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(400).json({ message: 'Bad Request!' })
            return;
        }

        let role = "member"
        role = !req.body.role ? role : req.body.role

        const hash = bcrypt.hashSync(password, parseInt(process.env.SALT));

        await db('users')
            .insert({ username, role, password: hash })
            .then(data => {
                console.log(data)
                if (data.rowCount === 0) {
                    res.status(406).json({ message: 'User Not Successfully Registered' })
                    return
                }
                res.json({ username, role })
            })
            .catch(next)
    })

module.exports = router;
