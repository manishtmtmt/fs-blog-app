const { model, Schema, default: mongoose } = require("mongoose");

const featuredPostSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("FeaturedPost", featuredPostSchema);
