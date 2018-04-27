import path from 'path';
import express from "express";
import exphbs from 'express-handlebars';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express();

import bodyParser from "body-parser";
import mongoose from 'mongoose';
import route from "./routes/";
const Promise = global.Promise;

mongoose.connect("mongodb://localhost/university-app");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.use(cookieParser());
app.use(session({
  cookie : { maxAge: 6000 },
  secret : "my_secret",
  saveUninitialized : false,
  resave : false
}))

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success');
  res.locals.error_message = req.flash('error');
  next();
});

app.use("/" , route)


app.engine('handlebars' , exphbs({defaultLayout : 'main.handlebars'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname , 'public')));

const port = process.env.port || 3000;
app.listen(3000 , () => console.log(`App is running at ${port}`));