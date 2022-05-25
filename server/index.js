const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories');
const multer = require('multer');

const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Mongo DB Connected")).catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "images");
    },
    filename:(req,file,cb) => {
        cb(null,req.body.name)
    }
});

const upload = multer({storage:storage});
app.post("/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/categories", catRoute);

app.listen("5000", () => {
    console.log("Backend is running");
});