import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

import {validationResult} from "express-validator";
import {registerValidation} from "./validations/auth.js"

import UserModule from "./models/User.js"

const mongoBDName = "blog" // укащываем то, как мы хотим назвать нашу базу данных, без неё мы просто подключаемся к серверу

mongoose
    .connect(`mongodb+srv://admin:1OQgE4k3ze9aypEz@cluster0.ytogzao.mongodb.net/${mongoBDName}?retryWrites=true&w=majority`)
    .then(i => console.log("DB ok"))
    .catch(err => console.log("Db error", err))

const app = express();

app.use(express.json());


app.post("/auth/register",registerValidation, async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModule({
        email: req.body.email,
        passwordHash,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    res.json(user)
})

app.listen(4444, (err)=> {
    if(err) {
        return console.log(err)
    }
    console.log("Server OK")
});