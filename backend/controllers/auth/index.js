const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const UserModel = require("../../models/auth");

const SALTROUND = 8;

const JWT_SECRET = "secret";

module.exports.registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  bcrypt.hash(password, +SALTROUND, async function (err, hash) {
    if (err) return res.status(500).send({ message: "Something went wrong" });
    const user = new UserModel({
      userName,
      email,
      password: hash,
    });
    await user.save();
    return res.status(200).send({ message: "Signup successful" });
  });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).send({ message: "Invalid Credentials" });
  bcrypt.compare(password, user.password, function (err, result) {
    if (err)
      return res.status(500).send({
        message: "Something went wrong, Please try again later",
        error: err,
      });
    if (!result)
      return res.status(400).send({ message: "Invalid Credentials" });
    else {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res.status(200).send({ message: "Login Successful!", token });
    }
  });
};
