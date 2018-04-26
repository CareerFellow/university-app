import express from "express";
const app = express();

import bodyParser from "body-parser";
import mongoose from 'mongoose';
import route from "./server/routes/";
const Promise = global.Promise;


mongoose.connect("mongodb://localhost/university-app");


app.use(bodyParser.json());
app.use("/" , route)

app.engine('handlebars' , exphbs({defaultLayout : 'main'}));
app.set('view engine' , 'handlebars');


const port = process.env.port || 3000;
app.listen(3000 , () => console.log(`App is running at ${port}`));