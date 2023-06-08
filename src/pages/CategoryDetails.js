import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { star, trash, plus } from "../assets";
import { getDataByID, deleteData } from "../helper/apicalls";
import { useNavigate } from "react-router-dom";

const CategoryDetails = () => {

  const [value, setValue] = useState();
  const [values, setValues] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const catId = params.catId;


 useEffect(() =>{
  categoryName();
  getExpenses();
 },[catId, value])

  let categoryURL = "category";

  const categoryName = () =>{
    getDataByID(catId, categoryURL).then((res) =>{
      if(res.name) setValue(res.name)
      console.log(res.name);
    }).catch((err) => console.log(err))
  }

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

  const handleDelete = (id) =>{
    deleteData(id, expenses).then((data) =>{
      getExpenses();
    })
  }

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
                  <div class="text-success fw-bold">
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
      <img
        className="myfabbottom icon"
        title="Add Expenses"
        src={plus}
        alt="Icon Communities"
        onClick={() => navigate("/addexpenses")}
      />
    </div>
  );
};

export default CategoryDetails;
