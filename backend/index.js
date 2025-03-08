const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const userModel = require("./models/users");
const localStrategy = require("passport-local");
const expressSession = require("express-session");
passport.use(new localStrategy(userModel.authenticate()));
const flash = require("connect-flash");
const host = process.env.FRONTEND_HOST;
const MongoStore = require("connect-mongo");
const mongoURI = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  expressSession({
    secret: "ihqwdhioqhf",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      collectionName: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


try {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("MongoDB connected");
} catch (error) {
  console.log("MongoDB connection error", error);
}

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.post("/signup", (req, res) => {
  let userData = new userModel({
    username: req.body.name,
    email: req.body.email,
  });

  userModel
    .register(userData, req.body.password)
    .then((registeredUser) => {
      req.logIn(registeredUser, (err) => {
        if (err) {
          console.error("Login error after registration:", err);
          req.flash("error", "Login failed after registration.");
          return res.json({ error: "Login failed after registration." });
        }
        // Successful registration and login
        return res.json({ success: "Registration successful." });
      });
    })
    .catch((err) => {
      console.error("Registration error:", err);
      req.flash("error", err.message);
      res.json({ error: err.message });
    });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "An error occurred during authentication." });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login failed." });
      }
      return res.json({ success: "Login successful." });
    });
  })(req, res, next);
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(`${host}/`);
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect(`${host}/login`);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
