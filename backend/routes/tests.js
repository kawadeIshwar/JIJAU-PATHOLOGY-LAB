const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');

// Simple sample tests list (static sample)
const SAMPLE = [
  {id:1, name:'Complete Blood Count', price:200, info:'CBC includes ...'},
  {id:2, name:'Lipid Profile', price:500, info:'Cholesterol tests'},
  {id:3, name:'COVID-19 RT-PCR', price:800, info:'PCR test'}
];

router.get('/', (req,res)=> {
  res.json(SAMPLE);
});

// protected example: create a booking / request
router.post('/book', /* auth, */ (req,res)=> {
  const {testId, patientName, contact} = req.body;
  if(!testId || !patientName) return res.status(400).json({msg:'Missing fields'});
  // In a real app you'd persist booking to DB.
  res.json({msg:'Booking created (sample)', booking:{testId,patientName,contact, bookedBy:req.user.id}});
});

module.exports = router;
