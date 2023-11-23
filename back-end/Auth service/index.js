const express = require("express");
const router = require("./src/routes");
const db = require("./src/config/db");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3003;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//connect db
db.connect();

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5501" }));

//init router
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
