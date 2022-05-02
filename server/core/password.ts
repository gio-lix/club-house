import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github"



passport.use('github',new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) =>  {

        const user = {
            fullName: profile.displayName,
            avatar: profile.photos?.[0].value,

        }
        console.log("accessToken - ", accessToken, refreshToken, profile, cb)
    }
));
export {passport}