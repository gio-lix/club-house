import {UserType} from "../pages";
import express from "express"
import dotenv from "dotenv"
import multer from "multer";
import cors from "cors"
import {nanoid} from "nanoid";
import Code from "../models"
const {SMS_API_KEY} = process.env

const app = express()

declare global {
    namespace Express {
        interface User extends UserType {

        }
    }
}

dotenv.config({path: 'server/.env'})
app.use(cors())
app.use(express.json())

import {passport} from "./core/password";
import Axios from "../core/axios";

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
    res.json({
        url: `/avatars/${req.file.filename}`
    })
})

app.get("/auth/me", passport.authenticate('jwt', { session: false }), (req,res) => {
    res.json(req.user)
})


app.get("/auth/sms/activate", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const userId = req.user.id
    const smsCode = req.query.code

    if (!smsCode) {
        return res.status(400).send()
    }
    try {

        const findCode = await Code.Code.findOne({
            where: {code: smsCode, user_Id: userId}
        })
        if (findCode) {
            await Code.Code.destroy({   where: {code: smsCode, user_Id: userId} })
            return  res.send("Delete Code")
        } else {
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(500).json({
            message: "Error while sending message"
        })
    }
})




app.get("/auth/sms", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const phone = req.query.phone
    const userId = req.user.id
    const randomCode = Math.floor(Math.random() * (9999 - 1000)) + 1000
    if (!phone) {
        return res.status(400).send()
    }

    try {
        // await Axios.get(`https://sms.ru/sms/send?api_id=${SMS_API_KEY}=995595552864&msg=${randomCode}`)

        await Code.Code.create({
            code: randomCode,
            user_Id: userId
        })
        res.status(201).send()
    } catch (error) {
        res.status(500).json({
            message: "Error while sending message"
        })
    }
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