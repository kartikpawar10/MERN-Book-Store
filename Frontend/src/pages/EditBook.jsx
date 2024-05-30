import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setAuthor(res.data.data[0].author);
        setTitle(res.data.data[0].title);
        setPublishYear(res.data.data[0].publishYear);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        alert("An Error Happened . Please Check console");
      });
  }, []);
  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    setError(null);
    axios
      .put(`http://localhost:5000/books/edit/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        setError("An error occurred while saving the book. Please try again.");
      });
  };

  const isFormValid = title && author && publishYear;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-6 space-y-6">
        <BackButton />
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Edit Book
        </h1>
        <div className="space-y-4">
          {loading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the book title"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the author's name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">
              Publish Year
            </label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the publish year"
            />
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            className={`w-full py-3 mt-4 text-lg font-semibold rounded-md text-white transition ${
              !isFormValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            }`}
            type="button"
            onClick={handleEditBook}
            disabled={!isFormValid || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
