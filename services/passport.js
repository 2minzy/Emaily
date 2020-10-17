const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// require를 사용해서 가져오는 대신에 여러 곳에 import 되고있는 지금 이 users모델 처럼
// mongoose가 모델을 여러번 import하면 헷갈려해서 테스트 환경 등에서 충돌을 막기위해 아래 방식을 사용해 import한다.
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id는 아래의 profile.id와는 다른 mongoDB 자체의 id를 가르키는 shortcut
  // authentication method가 많으면(facebook, linkedin) google.id만을 쓸 수 없기 떄문에 user.id를 쓴다.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // server에게 heroku proxy가 안전하다는 의미.
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) {
          // we already have a record with the given profile ID
          return done(null, existingUser);
        } 
        // we don't have a user record with this ID, make a new record
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
    }
  )
);
