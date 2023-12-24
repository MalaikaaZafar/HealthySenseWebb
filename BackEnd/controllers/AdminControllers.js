const User = require('../models/User');

const getAllDoctors=async(req,res)=>{
    const docList=await User.find({type:'Doctor'});
    if (!docList)
        return res.status(404).json({message:"No doctors found"});
    return res.status(200).json(docList);
}


const getAllPatients=async(req,res)=>{
    try
    {
        const patientList=await User.find({type: 'Patient'});
        if (!patientList)
            return res.status(404).json({message:"No patients found"});
        return res.status(200).json(patientList);
    }catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

module.exports={
    getAllDoctors,
    getAllPatients
};