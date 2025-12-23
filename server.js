import express from "express";
import targets from "./routes/targets.js";



const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  next();
});

app.use((req, res, next) => {
  req.headers["X-Server-Start-Time"];
  next();
});


app.use("/targets", targets);