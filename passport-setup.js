const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');  

require('dotenv').config({ path: '.env.development' });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Find or create a user in your database
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await new User({
        googleId: profile.id,
        username: profile.displayName
      }).save();
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
