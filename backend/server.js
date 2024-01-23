//Configuring the environment variables
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env'
});

const express = require("express");
const app = express();

const session = require("express-session");
const MongoDBStore = require("connect-mongo")(session);
const flash = require("express-flash");

const passport = require("passport");

const mongoose = require("mongoose");
const mongoSanitize = require('express-mongo-sanitize');

const PostRouter = require("./Routes/postsRoute");
const AuthRouter = require("./Routes/authRoute");
const UserRouter = require("./Routes/userRoute");
const UploadRouter = require("./Routes/fileUploadRoute");
const UploadUserRouter = require("./Routes/userFileUpload");
const configurePassport = require("./http/config/passport");

const port = process.env.Port_No || process.env.PORT;
// const DB = process.env.DB_Local;
const DB_Cloud = process.env.DB_Cloud;

//To access the request body and form data
app.use(express.json({ limit: '15Mb' }));
app.use(express.urlencoded({ extended: false }));

//To prevent NoSQL query injection
app.use(mongoSanitize());

//Mongoose connection 
mongoose.connect(DB_Cloud,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((con) => {
  console.log(`Connected to ${con.connection.name}//${con.connection.host}//${con.connection.port}`);
})
.catch(err => console.error(err)); 
//Database Connection String
const connection = mongoose.connection;

//Storing the session in database
const mongoStore = new MongoDBStore({
  mongooseConnection: connection,
  collection: 'session'
});

//Session configuration
app.use(session({
  secret: process.env.Secret_Key,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60*24 }
}));

//Passport configuration
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Blog post routes
app.use("/api/v1/posts",PostRouter);
//Authentication routes
app.use("/api/v1/auth",AuthRouter);
//User routes
app.use("/api/v1/users",UserRouter);
//Image upload routes
app.use("/api/v1/post-image",UploadRouter);
app.use("/api/v1/user-image",UploadUserRouter);

app.listen(port,() => {
  console.log(`Connected to ${port}`);
});
