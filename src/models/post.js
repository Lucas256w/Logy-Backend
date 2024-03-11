const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  author: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
  published: { type: Boolean, required: true },
});

PostSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_FULL);
});

module.exports = mongoose.model("Post", PostSchema);
