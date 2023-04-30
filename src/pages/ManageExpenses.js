import { useState, useEffect } from "react";
import { star, trash, plus, edit } from "../assets";
import { ToastContainer, toast } from "react-toastify";
import { getData, deleteData } from "../helper/apicalls";
import { useNavigate } from "react-router-dom";

const ManageExpenses = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const expenses = "expenses";

  const preload = () => {
    getData(expenses).then((res) => {
      const expenses = res;
      console.log(res);
      const total = expenses.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0
      );
      setValues(res);
      setTotalExpenses(total);
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleDelete = async (id) => {
    await deleteData(id, expenses)
    //.then((data) => {
      preload();
      toast("Expense Removed");
   // });
  };
  const handleUpdate = (id) => {
    const updateurl = `/addexpenses?id=${id}`;
    navigate(updateurl);
  };

  return (
    <div class="mt-4 container pb-5">
      <div className="my-4">
        <h3 className="text-success">All Expenses</h3>
        <p>Total Expenses: {totalExpenses}</p>
      </div>
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

                  <div class="text-success">Date: {row.date}</div>
                </div>
                <div class="d-flex justify-content-center align-items-center col-md-1">
                  <img
                    src={trash}
                    alt="Icon Communities"
                    onClick={() => handleDelete(row.id)}
                  />
                  <img
                    src={edit}
                    alt="Icon Communities"
                    onClick={() => handleUpdate(row.id)}
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

export default ManageExpenses;
