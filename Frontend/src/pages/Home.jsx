import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-4 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Book List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl transition-transform transform hover:scale-110" />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            {books.length === 0 ? (
              <div className="flex flex-col items-center py-10">
                <FaBookOpen className="text-gray-400 text-6xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Books Available
                </h2>
                <p className="text-gray-500">
                  Please add some books to the list.
                </p>
              </div>
            ) : (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Publish Year
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {books.map((book, index) => (
                    <tr key={book._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">
                        {book.author}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">
                        {book.publishYear}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">
                        <div className="flex space-x-4">
                          <Link
                            to={`/books/details/${book._id}`}
                            className="text-blue-500 hover:text-blue-700 transition"
                          >
                            <BsInfoCircle size={20} />
                          </Link>
                          <Link
                            to={`/books/edit/${book._id}`}
                            className="text-green-500 hover:text-green-700 transition"
                          >
                            <AiOutlineEdit size={20} />
                          </Link>
                          <Link
                            to={`/books/delete/${book._id}`}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <MdOutlineDelete size={20} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
