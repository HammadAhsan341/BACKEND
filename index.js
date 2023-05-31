const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/AdminRoute");
const cors = require("cors");
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/VotingSystem_DB")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


app.use(cors());
//middlewares
app.use(express.json());
app.use('/user',userRoute);
app.use('/admin',adminRoute);



app.listen(4000, function(){
    console.log("Server is Ready");
});