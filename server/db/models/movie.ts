import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.SchemaTypes.String,
      required: true,
      max: 50,
    },
    publishedYear: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    poster: {
      type: mongoose.SchemaTypes.String,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", MovieSchema);
