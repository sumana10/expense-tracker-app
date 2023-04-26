import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import star from "../assets/star.svg";
import trash from "../assets/delete.svg";
import { deleteData } from "../helper/apicalls";

const CategoryDetails = () => {
  const [value, setValue] = useState();
  const [values, setValues] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const params = useParams();

  const catId = params.catId;

  useEffect(() => {
    categoryName();
    getExpenses();
  }, [catId, value]);

  //category name

  let url = `http://localhost:3000/category?id=${catId}`;

  console.log(url);

  const categoryName = () => {
    axios.get(url).then((res) => {
      console.log(res.data[0].name);

      setValue(res.data[0].name);
    });
  };

  let urlSpecific = `http://localhost:3000/expenses?category=${value}`;

  console.log(urlSpecific);

  const getExpenses = () => {
    axios.get(urlSpecific).then((res) => {

      const expenses = res.data;
      console.log(res.data);
      const total = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
      setValues(res.data);
      setTotalExpenses(total);
    });
  };

  let expenses = "expenses";

  const handleDelete = (id) => {
    deleteData(id, expenses).then((data) => {
      getExpenses();
    });
  };

  return (
    <div class="mt-4 container">
       <div className="my-4">
              <h3 className="text-success">{value}</h3>
              <p>Total Expenses: {totalExpenses}</p>
        </div>
        {values && values.length === 0 && <div>No expenses available</div>}
      <ul class="list-group">
        {values &&
          values.map((row, index) => (
            <li class="list-group-item">
              <div class="row" style={{ cursor: "pointer" }}>
                <div class="d-flex justify-content-center align-items-center col-md-1">
                  <div class="icon">
                    <img src={star} alt="" />
                  </div>
                </div>

                <div class="my-class col-md-8">
                  <div class="text-success">
                    Description: {row.description} Category: {row.category}{" "}
                    Amount: {row.amount}
                  </div>

                  <div class="text-success">
                    Date:
                    {row.date}
                  </div>
                </div>
                <div class="d-flex justify-content-center align-items-center col-md-1">
                  <img
                    src={trash}
                    alt="Icon Communities"
                    onClick={() => handleDelete(row.id)}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryDetails;
