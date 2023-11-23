const express = require("express");
const router = require("./src/routes");
const cors = require("cors");
const db = require("./src/config/db");
const app = express();
const middlewareController = require("./src/app/controllers/middleWareController");
const port = 3002;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

// app.use(middlewareController.verifyToken);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
//connect db
db.connect();

//init router
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
