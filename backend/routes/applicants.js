const express = require('express');
const router = express.Router();
const Applicant = require("../models/Applicant");


router.get('/',async(req,res)=>{
    try{
        const applicants = await Applicant.find().sort({appliedAt:-1});
        res.json(applicants);
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post('/',async(req,res)=>{
    try{
        const applicant = new Applicant(req.body);
        const savedApplicant = await applicant.save();
        res.status(201).json({
            message:"Application submitted succesfully!",
            applicant:savedApplicant
        });
    }catch(error){
        res.status(400).json({message:error.message});
    }
});

router.get('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.json(applicant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;