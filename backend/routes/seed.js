const express = require('express');
const Dentist = require('../models/Dentist');
const bcrypt = require('bcrypt');
const router = express.Router();

const sampleDentists = [
  {
    name: 'Dr. Arjun',
    email: 'arjun@oralvis.com',
    specialization: 'Orthodontics',
    password: 'arjun1234',
  },
  {
    name: 'Dr. Meena',
    email: 'meena@oralvis.com',
    specialization: 'Prosthodontics',
    password: 'meena789',
  },
  {
    name: 'Dr. Karthik',
    email: 'karthik@oralvis.com',
    specialization: 'Endodontics',
    password: 'karthik456',
  },
  {
    name: 'Dr. Anitha',
    email: 'anitha@oralvis.com',
    specialization: 'Pediatric Dentistry',
    password: 'anitha321',
  },
  {
    name: 'Dr. Sruthi',
    email: 'sruthi@oralvis.com',
    specialization: 'Periodontics',
    password: 'sruthi999',
  },
];

router.post('/dentists', async (req, res) => {
  try {
    const dentistsWithHashedPasswords = await Promise.all(
      sampleDentists.map(async (dentist) => ({
        ...dentist,
        password: await bcrypt.hash(dentist.password, 10),
      }))
    );

    await Dentist.insertMany(dentistsWithHashedPasswords);
    res.json({ success: true, message: 'sample dentists added' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;