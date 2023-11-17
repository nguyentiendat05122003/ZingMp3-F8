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

//connect db
db.connect();

//init router
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
