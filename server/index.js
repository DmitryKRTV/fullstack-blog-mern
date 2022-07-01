import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

mongoose
    .connect("mongodb+srv://admin:1OQgE4k3ze9aypEz@cluster0.ytogzao.mongodb.net/?retryWrites=true&w=majority")
    .then(i => console.log("DB ok"))
    .catch(err => console.log("Db error", err))

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("hello world!")
});

app.post("/auth/login", (req, res)=>{
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullName: "Vasya"
    }, "secret123");

    res.json({
        success:true,
        token,
    });
})

app.listen(4444, (err)=> {
    if(err) {
        return console.log(err)
    }
    console.log("Serser OK")
});