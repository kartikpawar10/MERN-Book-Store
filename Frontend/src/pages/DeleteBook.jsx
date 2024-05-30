import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        alert("An error occurred. Please check the console for details.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-200 to-red-400 p-4 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <BackButton />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Delete Book
        </h1>
        {loading ? (
          <div className="flex justify-center mb-4">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-2xl text-gray-700 text-center">
              Are you sure you want to delete this book?
            </h3>
            <button
              className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-red-700 transition"
              onClick={handleDeleteBook}
            >
              Yes, Delete it!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
