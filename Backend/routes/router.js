import express from "express";
import {
  createNewBook,
  deleteSingleBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controller/crud.js";
const router = express.Router();
router.route("/").get(getAllBooks).post(createNewBook);
router.route("/:id").get(getSingleBook).delete(deleteSingleBook);

router.route("/edit/:id").put(updateBook);
export default router;
