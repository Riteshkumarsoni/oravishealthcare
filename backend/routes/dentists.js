const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Dentist = require('../models/Dentist');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dentists = await Dentist.find({}, '-password');
    res.json(dentists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dentists' });
  }
});

router.post('/register', async (req, res) => {
  try {
    /*const dentist = new Dentist(req.body);
    await dentist.save();
    res.json({ success: true, message: 'Dentist registered' });*/
    const {name, email, specialization, password} = req.body
    if(!email || !password){
      return res.status(400).json({ success: false, message: 'email or password should bot be empty' });
    }
    const existingDentist = await Dentist.find({email})
    console.log(existingDentist)
    if (existingDentist.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dentist = new Dentist({
        name,
        email,
        specialization,
        password: hashedPassword,
    });

    await dentist.save();
    res.json({ success: true, message: 'Dentist registered' });




  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try{
      const { email, password } = req.body;
      const dentist = await Dentist.findOne({ email });
      if (!dentist) return res.status(400).json({ message: 'Dentist not found' });

      const valid = await bcrypt.compare(password, dentist.password);
      if (!valid) return res.status(400).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: dentist._id, role: 'dentist' }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({ token, dentistId: dentist._id });
  }
  catch (err){
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;