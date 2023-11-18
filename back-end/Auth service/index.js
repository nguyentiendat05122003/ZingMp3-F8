const express = require("express");
const router = require("./src/routes");
const db = require("./src/config/db");
const cors = require("cors");
const app = express();
const port = 3003;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
//connect db
db.connect();

//init router
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
