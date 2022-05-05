import jwt from "jsonwebtoken";
import {UserType} from "../pages";


export const createJwtToken = (user: UserType): string => {
    const token = jwt.sign(
        {
            data: user
        },
        process.env.SECRET_JWT_KEY || "",
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: "HS256",
        }
    );

    return token;
};