import { useState, useEffect } from "react";
//Routing state for the component
import { useNavigate, useSearchParams } from "react-router-dom";
//Apicalls
import { getDataByID, updateData, addData } from "../helper/apicalls";
//Custom hooks for the component
import useCategory from "../utils/useCategory";
//Validation funtion for the component
import { validation } from "../utils/validation";

const AddExpenses = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const expenses = "expenses";

  const [categories] = useCategory();

  //State for the form fields
  const [values, setValues] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  //Error messages for the form fields
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  //Desctructures the state object
  const { description, amount, category, date } = values;

  console.log(values);

  const navigate = useNavigate();

  
  useEffect(() => {
    preload();
  }, []);

  const preload = async () =>{
    const response = await getDataByID(id, expenses);
    if(response){
      setValues(response)
    }
  }


  //Onchange with higher order method
  const handleChange = (data) => (event) =>{
    
    setValues({...values, [data]: event.target.value });

    const value = event.target.value;

    // Copy error object
    let errorsCopy = { ...errors };

    // Called validation
    const errorR = validation(data, value, errorsCopy);

    // Update the state
    setErrors(errorR);
  };

  const saveExpenses = async () => {

    let newObj = {
      description,
      amount,
      category,
      date,
    }
    //check if the fields are blank then return
    if(!description || !amount || !category || !date) {
      alert("Please fill all the fields");
      return;
    }

    // check if there are any errors in errors object return boolean
    // The provided code is using the Object.values() method to extract an array of values from the errors object, and then using the .some() method to determine whether any of the values in the array are truthy. The resulting boolean value indicates whether there are any errors in the errors object.
    const hasErrors = Object.values(errors).some((val) => val);

    // if there are errors, don't submit the form
    if (hasErrors) return;

    setErrors({
      ...errors,
      description: "",
      amount: "",
      category: "",
      date: "",
    });

    if(!id) await addData(newObj, expenses);
    else await updateData(newObj, id, expenses);

    navigate("/expenses");
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
              // onChange={(e) =>
              //   setValues({ ...values, category: e.target.value })
              // }
              onChange={handleChange("category")}
            >
              <option value="">Choose a category</option>
              {categories.map((cat) =>(
                <option value={cat.name} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn bg-success bg-gradient text-white"
            style={{ display: "block", width: "100%" }}
            onClick={saveExpenses}
          >
            Enter Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpenses;
