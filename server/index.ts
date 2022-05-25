import {UserType} from "../pages";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import AuthController from "./controllers/AuthController"
// const {SMS_API_KEY} = process.env


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
import {uploader} from "./core/uploader";



app.post("/upload", uploader.single("photo"), (req, res) => {
    res.json({
        url: `/avatars/${req.file.filename}`
    })
})
console.log("hello auth")

app.post("/auth/me", passport.authenticate('jwt', { session: false }), AuthController.getMe)
app.get("/auth/sms/activate", passport.authenticate('jwt', { session: false }), AuthController.activate )
app.get("/auth/sms", passport.authenticate('jwt', { session: false }), AuthController.sendSMS )
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}), AuthController.authCallBack);

app.listen("5001", () => {
    console.log('port running')
})