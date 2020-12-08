// imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");

const routes = require("./routes");
const passport = require("./passport");

const port = process.env.PORT || 5000;
const app = express();

// middleware - server logging
app.use(morgan("dev"));

// middleware - JSON parsing
app.use(express.json());

// middleware - cors
const corsOptions = {
  // from which URLs do we want to accept requests
  origin: [
    "http://localhost:3000",
    "https://give-it-a-shot-client.herokuapp.com"
  ],
  credentials: true, // allow the session cookie to be sent to and from the client
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// middleware - session config
app.use(
  session({
    // session is stored in the DB
    secret: process.env.SECRET,
    resave: false, // will not resave sessions
    saveUninitialized: false, // only create a session when a property is added to the session
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// middleware - passport config
app.use(passport.initialize());
app.use(passport.session());

// middleware - API routes
const version = "/api/v1";
app.use(version + "/auth", routes.auth);
app.use(version + "/drinks", routes.drinks);
app.use(version + "/users", routes.users);

// connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
