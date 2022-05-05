import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github"
import {Strategy as JwtStrategy , ExtractJwt  } from "passport-jwt"
import User from "../../models"
import {createJwtToken} from "../../utils/createjwtToken";
import {UserType} from "../../pages";
const {SECRET_JWT_KEY} = process.env


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_JWT_KEY
}

passport.use(
    "jwt",
    new JwtStrategy(opts, (jwt_payload, done) =>  {
        done(null, jwt_payload.data)
}));

passport.use('github',new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/auth/github/callback"
    },
    async (_:unknown, __:unknown, profile, done) =>  {
        try {
            let userData: UserType;
            const obj: Omit<UserType, 'id'> = {
                fullname: profile.displayName,
                avatarUrl: profile.photos?.[0].value,
                isActive: 0,
                username: profile.username,
                phone: '',
            }

            const finedUser = await User.User.findOne({
                where:{
                    username: obj.username
                }
            })

            if (!finedUser) {
                const user = await User.User.create(obj)
                userData = user.toJSON()
            } else {
                userData = await finedUser.toJSON()
            }

            done(null,{...userData,
                token: createJwtToken(userData)
            })
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