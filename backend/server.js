const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require("../backend/db")
// require('dotenv').config();

const userRoutes = require('./routes/users');
const dentistRoutes = require('./routes/dentists');
const checkupRoutes = require('./routes/checkups');
const seedRoutes = require('./routes/seed');
const dotenv = require('dotenv').config()

const app = express();
app.use(express.json());
const corsOptions = {
  origin: [
    'http://localhost:3000',    // Local development
    'https://oravishealthcare.vercel.app'  // Vercel frontend
  ],
  credentials: true  // Allow credentials if you're using cookies or session-based auth
};

app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));

/*mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));*/

app.use('/api/users', userRoutes);
app.use('/api/dentists', dentistRoutes);
app.use('/api/checkups', checkupRoutes);
app.use('/api/seed', seedRoutes);

app.get("/test", (req, res) => {
    console.log("working");
    res.send("hello")
})

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

module.exports = app
