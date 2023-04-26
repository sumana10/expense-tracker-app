import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  const styleX = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <div className="my-4" style={styleX}>
      <h3 className="text-success">404 Page Not Found</h3>
      <Link to="/" className="btn btn-success btn-gradient">Go To Expense Tracker</Link>
    </div>
  );
};

export default NoPage;
