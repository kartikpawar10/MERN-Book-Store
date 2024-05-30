import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data.data[0]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
        <BackButton />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Book Details
        </h1>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <span className="text-xl font-medium text-gray-600">ID:</span>
              <span className="text-lg text-gray-800">{book._id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-medium text-gray-600">Title:</span>
              <span className="text-lg text-gray-800">{book.title}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-medium text-gray-600">Author:</span>
              <span className="text-lg text-gray-800">{book.author}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-medium text-gray-600">Publish Year:</span>
              <span className="text-lg text-gray-800">{book.publishYear}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
