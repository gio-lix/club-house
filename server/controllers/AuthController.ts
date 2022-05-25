import express from "express";
import Code from "../../models"
import User from "../../models"


class AuthController {
    getMe(req: express.Request, res: express.Response) {
        res.json(req.user)
    }

    authCallBack(req, res) {
        res.send(`<script>
            window.opener.postMessage('${JSON.stringify(req.user)}', '*');
            window.close()
        </script>`)
    }

    async activate(req: express.Request, res: express.Response) {
        const userId = req.user?.id
        const smsCode = req.query.code


        if (!smsCode) {
            return res.status(400).json({message: "enter active code"})
        }
        try {
            const findCode = await Code.Code.findOne({
                where: {code: smsCode, user_Id: userId}
            })
            if (findCode) {
                await User.User.update(
                    {isActive: 1}, {where: {id: userId}
                })
                await Code.Code.destroy({where: {code: smsCode, user_Id: userId}})
                return res.send()
            } else {
                res.status(400).json({message: "code dont found"})
            }
        } catch (error) {
            res.status(500).json({
                message: "Error while sending message"
            })
        }
    }

    async sendSMS(req, res) {
        const phone = req.query.phone
        const userId = req.user.id
        const randomCode = Math.floor(Math.random() * (9999 - 1000)) + 1000


        if (!phone) {
            return res.status(400).json({message: "enter code"})
        }

        try {
            // await Axios.get(`https://sms.ru/sms/send?api_id=${SMS_API_KEY}=995595552864&msg=${randomCode}`)
            const findCode = await Code.Code.findOne({
                where : {
                    user_Id: userId
                }
            })
            if (findCode) {
                return res.status(400).json({message:"code already send"})
            }

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
    }
}

export default new AuthController()