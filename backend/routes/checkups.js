const express = require('express');
const multer = require('multer');
const Checkup = require('../models/Checkup');
const auth = require('../middleware/auth');
const { response } = require('../server');
const router = express.Router();

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });*/

const storage = multer.memoryStorage()
const upload = multer({ storage });

router.post('/', auth('user'), upload.single('photo'),  async (req, res) => {
  const { dentistId ,notes} = req.body;
  const photobase64 = req.file ? req.file.buffer.toString("base64") : null
  const checkup = new Checkup({
    userId: req.user.id,
    dentistId,
    imagesbypatient: photobase64,
    notesbypatient: notes,
    imagesbydoctor: null,
    notesbydoctor: null
  });
  await checkup.save();
  res.json(checkup);
});

router.get('/user', auth('user'), async (req, res) => {
  const checkups = await Checkup.find({ userId: req.user.id }).populate('dentistId');
  res.json(checkups);
});

router.get('/dentist', auth('dentist'), async (req, res) => {
  const checkups = await Checkup.find({ dentistId: req.user.id }).populate('userId');
  res.json(checkups);
});

router.post('/:checkupId/upload', auth('dentist'), upload.single('photo'), async (req, res) => {
  const { notes } = req.body;
  const photobase64 = req.file ? req.file.buffer.toString("base64") : null
  /*const imagePaths = req.files.map(file => file.path);
  const parsedNotes = Array.isArray(notes) ? notes : [notes];*/

  const checkup = await Checkup.findById(req.params.checkupId);
  if (!checkup) return res.status(404).json({ message: 'Checkup not found' });
  /*checkup.images.push(...imagePaths);
  checkup.notes.push(...parsedNotes);
  const solution = new Checkup({
    imagesbydoctor: photobase64,
    notesbydoctor: notes
  })
  await solution.save();

  res.json(solution);*/

  const newData = {imagesbydoctor: photobase64, notesbydoctor: notes}
  const updateData = await Checkup.findByIdAndUpdate(req.params.checkupId, newData, {
    new: true,
    runValidators: true
  })
  await updateData.save()
  res.json(updateData)

});

module.exports = router;