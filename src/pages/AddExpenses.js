import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDataByID, updateData, addData } from "../helper/apicalls";
import useCategory from "../utils/useCategory";
import { validation } from "../utils/validation";
const AddExpenses = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const expenses = "expenses";

  const [categories] = useCategory();

  const [values, setValues] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  // Error State
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const { description, amount, category, date } = values;

  console.log(values);

  const navigate = useNavigate();

  const preload = () => {
    getDataByID(id, expenses).then((res) => {
      if (res) {
        setValues(res);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  //Onchange with higher order method
  const handleChange = (data) => (event) => {
    setValues({ ...values, [data]: event.target.value });

    const value = event.target.value;

    // Copy error object
    let errorsCopy = { ...errors };

    // Called validation
    const errorR = validation(data, value, errorsCopy);

    // Update the state
    setErrors(errorR);
  };

  const saveExpenses = () => {
    let newObj = {
      description,
      amount,
      category,
      date,
    };

    if (!description || !amount || !category || !date) {
      alert("Please fill all the fields");
      return;
    }

    // check if there are any errors in errors object return boolean
    const hasErrors = Object.values(errors).some((val) => val);

    // if there are errors, don't submit the form
    if (hasErrors) return;

    setErrors({
      description: "",
      amount: "",
      category: "",
      date: "",
    });

    if (!id) {
      console.log(expenses);

      addData(newObj, expenses).then((res) => {
        navigate("/expenses");
      });
    } else {
      updateData(newObj, id, expenses)
        .then((res) => {
          navigate("/expenses");
        })
        .catch((err) => console.log(err));
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "40px auto",
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="container pb-5" style={formStyle}>
          <div className="my-4 text-center">
            <h3 className="text-success">Add Expenses</h3>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="name"></label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter Expenses..."
              value={description}
              onChange={handleChange("description")}
            />
            <small>{errors.description}</small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author"></label>
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={handleChange("amount")}
            />
            <small>{errors.amount}</small>
          </div>
          {/* add field */}
          <div class="row mb-3">
            <div class="col">
              <input
                type="date"
                class="form-control"
                placeholder="Enter Date"
                aria-label="Enter Date"
                value={date}
                onChange={handleChange("date")}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="category"></label>
            <select
              className="form-control"
              id="category"
              value={category}
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            >
              <option value="">Choose a category</option>
              {categories.map((cat) => (
                <option value={cat.name} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn bg-success bg-gradient text-white"
            style={{ display: "block", width: "100%" }}
            onClick={() => saveExpenses()}
          >
            Enter Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpenses;
