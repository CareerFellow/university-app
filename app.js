import express from "express";
const app = express();

const port = process.env.port || 3000;
app.listen(3000 , () => console.log(`App is running at ${port}`));