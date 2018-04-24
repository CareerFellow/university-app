import express from "express";
const app = express();

import route from "./server/routes/";
// import route from "./server/routes/";

app.use("/" , route)

const port = process.env.port || 3000;
app.listen(3000 , () => console.log(`App is running at ${port}`));