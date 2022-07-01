import express from "express"

const app = express();

app.get("/", (req, res)=>{
    res.send("hello world a")
});

app.listen(4444, (err)=> {
    if(err) {
        return console.log(err)
    }
    console.log("Serser OK")
});