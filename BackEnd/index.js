const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app=express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

app.use('/', require('./routes/UserRoutes'));
app.use('/doctor', require('./routes/DoctorRoutes'));
app.use('/admin', require('./routes/AdminRoutes'));
app.use('/patient', require('./routes/PatientRoutes'));

const PORT =process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT, ()=> console.log('Server Running on port:', PORT)))
    .catch((error)=>console.log(error.message));

