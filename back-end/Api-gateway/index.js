const express = require("express");
const router = express.Router();
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 9000;

// const authProxy = createProxyMiddleware({
//   target: 'http://localhost:3001',
//   changeOrigin: true
// });

const userProxy = createProxyMiddleware({
  target: "http://localhost:3002",
  pathRewrite: {
    "^/users": "",
  },
  changeOrigin: true,
});

const adminProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  pathRewrite: {
    "^/admin": "",
  },
  changeOrigin: true,
});

//router.use('/auth', authProxy);
app.use("/users", userProxy);
// app.use("/auth", authProxy);
app.use("/admin", adminProxy);

router.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
