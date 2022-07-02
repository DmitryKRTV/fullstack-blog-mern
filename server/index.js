import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

import {validationResult} from "express-validator";
import {registerValidation} from "./validations/auth.js"

import UserModule from "./models/User.js"

mongoose
    .connect("mongodb+srv://admin:1OQgE4k3ze9aypEz@cluster0.ytogzao.mongodb.net/?retryWrites=true&w=majority")
    .then(i => console.log("DB ok"))
    .catch(err => console.log("Db error", err))

const app = express();

app.use(express.json());


app.post("/auth/register",registerValidation, (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const doc = new UserModule({
        email: req.body.email,
        passwordHash: req.body.password,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
    })

    res.json({
        success: true
    })
})

app.listen(4444, (err)=> {
    if(err) {
        return console.log(err)
    }
    console.log("Server OK")
});