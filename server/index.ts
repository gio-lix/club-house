import express from "express"
import dotenv from "dotenv"

const app = express()

dotenv.config({path: 'server/.env'})

import {passport} from "./core/password";


app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    (req, res) => {
        res.send(`
        <script>
            window.opener.postMessage('${JSON.stringify(req.user)}', '*');
            window.close()
        </script>
        `)
        // res.json(req.user);
    });


app.listen("5001", () => {
    console.log('port running')
})