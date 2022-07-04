import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

import {validationResult} from "express-validator";
import {registerValidation} from "./validations/auth.js"

import UserModule from "./models/User.js"
import {mongoDBURL} from "./secretInfo/mongoDB.js";



mongoose
    .connect(mongoDBURL)
    .then(i => console.log("DB ok"))
    .catch(err => console.log("Db error", err))

const app = express();

app.use(express.json());


app.post("/auth/register", registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModule({
            email: req.body.email, passwordHash: hash, fullName: req.body.fullName, avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, "secret123", {
            expiresIn: "30d"
        })

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData, token,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегестрироваться",
        })
    }

})

app.post("/auth/login", async (req, res) => {
    try {
        const user = await UserModule.findOne({ email: req.body.email});

        if(!user) {
            return req.status(404).json({
                message: "Неверный логин или пароль",
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPassword) {
            return req.status(404).json({
                message: "Неверный логин или пароль",
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, "secret123", {
            expiresIn: "30d"
        })

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData, token,
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось авторизоваться",
        })
    }
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Server OK")
});