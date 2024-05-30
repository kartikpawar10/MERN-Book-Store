import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8 flex flex-col items-center">
      <div className="flex justify-center items-center gap-x-4 mb-8">
        <button
          className="bg-sky-500 text-white hover:bg-sky-700 px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-500 text-white hover:bg-sky-700 px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Book List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-5xl transition-transform transform hover:scale-110" />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-2xl text-gray-500 mb-4">No books available</p>
            <Link
              to="/books/create"
              className="bg-sky-500 text-white hover:bg-sky-700 px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Add New Book
            </Link>
          </div>
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
