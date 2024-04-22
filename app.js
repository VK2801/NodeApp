import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json())

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "NewNodeApp",
  })
  .then((c) => console.log("Database connected"))
  .catch((e) => console.log("Error while connecting to database"));

const loginuserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("userData", loginuserSchema);

app.post("/user/new", async(req,res)=>{
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    res.status(201).cookie("Hicokies","abcd").json({
        success:"True",
        message:"Register Successully",
    });
});

app.get("/user/all", async(req,res)=>{
    const users = await User.find({})
    res.json({
        success:"True",
        users,
    })
})

app.get("/",(req,res)=>{
    res.send("Nice Working");
})

app.listen(4028, () => {
  console.log("Server is running");
});
