import React from "react";
import NotFoundImg from "../assets/404.jpg";

const NotFound = () => {
  return (
    <div className="h-screen">
      <img className="h-screen mx-auto" src={NotFoundImg} alt="" />
    </div>
  );
};

export default NotFound;
