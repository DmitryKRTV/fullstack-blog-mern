import {body} from "express-validator";

export const registerValidation = [
    body("email", "Invalid email format").isEmail(),
    body("password", "It has to have more than 5 symbols").isLength({min: 5}),
    body("fullName", "It has to have more than 3 symbols").isLength({min: 3}),
    body("avatarUrl", "It has to be an URL").optional().isURL(),
];