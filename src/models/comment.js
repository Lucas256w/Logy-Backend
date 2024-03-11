const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  post: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
});

PostSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_FULL);
});

module.exports = mongoose.model("Comment", CommentSchema);
