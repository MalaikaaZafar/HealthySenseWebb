const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static('uploads'));

app.use('/', require('./routes/UserRoutes'));
app.use('/', require('./routes/PatientRoutes'));
app.use('/doctor', require('./routes/DoctorRoutes'));
app.use('/admin', require('./routes/AdminRoutes'));
app.use('/patient', require('./routes/PatientRoutes'));
app.use('/payment', require('./routes/PaymentRoutes'));

app.get('/uploads/:image', (req, res)=>{
    res.sendFile(__dirname+'/uploads/'+req.params.image);
});


const PORT =process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT, ()=> console.log('Server Running on port:', PORT)))
    .catch((error)=>console.log(error.message));
