import express from "express"
import dotenv from "dotenv"
const app = express()

dotenv.config({  path: 'server/.env' })

import "./core/db"
import {passport} from "./core/password";


app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.send();
    });


app.listen("5001", () => {
    console.log('port running')
})