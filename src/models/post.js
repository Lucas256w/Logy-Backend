const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  author: { type: String, required: true, default: "Jiahao Huamani" },
  published: { type: Boolean, required: true },
});

PostSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_FULL);
});

PostSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
