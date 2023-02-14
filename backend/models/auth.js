const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = model("user", userSchema);

module.exports = UserModel;
