import express from "express"
import dotenv from "dotenv"
import multer from "multer";
import cors from "cors"
import {nanoid} from "nanoid";

const app = express()

dotenv.config({path: 'server/.env'})
app.use(cors())

import {passport} from "./core/password";

const uploader = multer({
    storage: multer.diskStorage({
        destination: function (_, __, cb) {
            cb(null, "public/avatars")
        },
        filename: function (_, file, cb) {
            cb(null, file.fieldname + '-' + nanoid(6) + "." + file.mimetype.split('/').pop())
        }
    })
})

app.post("/upload", uploader.single("photo"), (req, res) => {
    res.json(req.file)
})

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    (req, res) => {
        res.send(`<script>
            window.opener.postMessage('${JSON.stringify(req.user)}', '*');
            window.close()
        </script>`)
    });

app.listen("5001", () => {
    console.log('port running')
})