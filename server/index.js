const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');

const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Mongo DB Connected")).catch(err=>console.log(err));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen("5000", () => {
    console.log("Backend is running");
});