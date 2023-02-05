require("express-async-errors");
require("dotenv").config();
require("./db");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const postRouter = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/post", postRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${PORT}`);
});
