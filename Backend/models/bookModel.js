import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
    },
    publishYear: {
      type: Number,
      required: [true, "Please provide a publish year"],
      default: 2024,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
