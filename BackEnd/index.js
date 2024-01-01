const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const parse = require('./middleware/parse');

const app=express();

app.use(cookieParser());
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(fileUpload({
    createParentPath: true
}));
app.use(parse);
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use('/', require('./routes/UserRoutes'));
app.use('/', require('./routes/PatientRoutes'));
app.use('/doctor', require('./routes/DoctorRoutes'));
app.use('/admin', require('./routes/AdminRoutes'));
app.use('/patient', require('./routes/PatientRoutes'));
app.use('/payment', require('./routes/PaymentRoutes'));

const PORT =process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT, ()=> console.log('Server Running on port:', PORT)))
    .catch((error)=>console.log(error.message));
