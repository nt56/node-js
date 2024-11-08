const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

//user Authentication
passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      //authentication logic
      //   console.log("Received Creditials : ", username, password);

      //checking username
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      //checking password
      const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

//export configured passport
module.exports = passport;
