import React from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit inline-block"
      >
        <MdArrowBack />
      </Link>
    </div>
  );
};

export default BackButton;
