const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbURI = process.env.MONGODB_URI;
try{
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
}catch(error){
    console.log("MongoDB connection error",error);
}

app.get('/', (req, res) => {
    res.send('Express server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});