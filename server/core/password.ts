import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github"
import User from "../../models"


passport.use('github',new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/auth/github/callback"
    },
    async (_:unknown, __:unknown, profile, done) =>  {
        try {
            const obj = {
                fullname: profile.displayName,
                avatarUrl: profile.photos?.[0].value,
                isActive: 0,
                username: profile.username,
                phone: ''
            }

            const findUser = await User.User.findOne({
                where:{
                    username: obj.username
                }
            })
            if (!findUser) {
                const user = await User.User.create(obj)
                return done(null, user.toJSON())
            }
            done(null, findUser)
        } catch (error) {
            done(error)
        }
    }
));

passport.serializeUser(function (user: any, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    User.User.findById(id, function (err, user) {
        err ? done(err) : done(null, user)
    })
})
export {passport}