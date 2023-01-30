require("dotenv").config();
const { connect, set } = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

set("strictQuery", true);
connect(MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection failed: ", err.message || err));
