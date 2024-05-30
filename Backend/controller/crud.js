import Book from "../models/bookModel.js";
export const createNewBook = async (req, res) => {
  const { title, author, publishYear } = req.body;

  // Check if any of the required fields are missing
  if (!title || !author || !publishYear) {
    return res
      .status(400)
      .json({ msg: "Please provide all details correctly" });
  }

  try {
    // Create a new book document
    const newBook = await Book.create({ title, author, publishYear });
    res.status(200).json({ msg: newBook });
  } catch (error) {
    // Handle any errors that occur during the creation of the book
    res
      .status(500)
      .json({ msg: "Error creating the book", error: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  const allBooks = await Book.find({});
  if (!allBooks) {
    return res.status(500).json({ msg: "There is a problem in AllBooks" });
  }
  res.status(200).json({ nHits: allBooks.length, data: allBooks });
};

export const getSingleBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(500).json({ msg: "Please Provide Correct ID" });
  }
  const singleBook = await Book.find({ _id: id });
  res.status(200).json({ data: singleBook });
};
export const updateBook = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  if (!id) {
    return res.status(500).json({ msg: "Please Provide Correct ID" });
  }
  const updatedBook = await Book.findByIdAndUpdate(id, req.body);
  res.status(200).json({ data: updatedBook });
};
export const deleteSingleBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(500).json({ msg: "Please Provide Correct ID" });
  }
  const singleBook = await Book.findByIdAndDelete(id);
  res.status(200).json({ data: singleBook });
};
