const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('./passport-setup'); 
require('./models/WasteCategory');
require('./models/Waste');
require('./models/Address'); 
require('./models/Schedule'); 

require('dotenv').config({ path: '.env.development' });

const app = express();
app.use(cors()); 
const PORT = process.env.PORT || 3000;


console.log(process.env.GOOGLE_CLIENT_ID); // This should print your client ID if loaded correctly

// Middleware for body parsing
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/home', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('You are authenticated');
  } else {
    res.redirect('/api/auth/login'); 
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
