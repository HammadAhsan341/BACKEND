const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const userRoute = require("./routes/userRoute");
const axios = require('axios');
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




// Define a route on your backend server that acts as a proxy for the CORS-restricted request
app.get('/polygonscan-data', async (req, res) => {
  try {
    // Make the request to the external server using axios
    const response = await axios.get('https://cors-anywhere.herokuapp.com/https://mumbai.polygonscan.com/address/0xEB563c5C2450EAEE1B943524001b1899e9b9FB6C#readContract');
    
    // Send the response data back to the frontend
    res.json(response.data);
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Other routes and middleware definitions can go here

// Start the server

app.listen(4000, function(){
    console.log("Server is Ready");
});