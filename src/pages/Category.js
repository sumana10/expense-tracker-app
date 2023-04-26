import edit from "../assets/edit.svg";
import trash from "../assets/delete.svg";
import star from "../assets/star.svg";
import plus from "../assets/plus.svg";
import React, { useState, useEffect } from "react";
import useCategory from "../utils/useCategory";
import { addData, updateData, deleteData } from "../helper/apicalls";
import {ToastContainer, toast } from "react-toastify";

const Category = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useCategory();
  const [editCategory, setEditCategory] = useState(null);

  // let url = "http://localhost:3000/category";

  let categoryurl = "category";

  const saveCategory = () => {
    let newObj = {
      name: category,
    };

    if (editCategory) {
      updateData(newObj, editCategory.id, categoryurl)
        .then((res) => {
          const updatedCategories = categories.map((cat) =>
            cat.id === editCategory.id ? { ...editCategory, ...newObj } : cat
          );
          setCategories(updatedCategories);
          setEditCategory(null);
          setCategory("");
          toast("Category Updated");
        })
        .catch((err) => console.log(err));
    } else {
      addData(newObj, categoryurl).then((res) => {
        setCategories([...categories, res.data]);
        setCategory("");
        toast("Category Removed");
      });
    }
  };

  const deleteCategory = (id) => {
    deleteData(id, categoryurl).then((data) => {
      const updatedCategories = categories.filter((value) => value.id !== id);
      setCategories(updatedCategories);

    });
  };

  const updateCategory = (id) => {
    const editCat = categories.find((cat) => cat.id === id);
    setEditCategory(editCat);
    setCategory(editCat.name);
  };

  return (
    <div className="d-flex flex-column mb-auto" style={{height: '80vh'}}>
      <div class="mt-4 container">
        <div class="row">
          <div class="col-md-4">
            <div className="my-4">
              <h3 className="text-success">Expense Category</h3>
            </div>
            <div className="form-group mb-3" style={{ display: "flex" }}>
              <label htmlFor="name"></label>
              <input
                type="text"
                className="form-control"
                id="category"
                placeholder="Enter a category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <img
                className="myfab icon"
                src={plus}
                alt="Icon Communities"
                onClick={() => saveCategory()}
              />
            </div>
            {/* <button id="mybtn" className="btn btn-primary" onClick={() => saveCategory()}>
              Submit
            </button> */}
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              {categories.map((cat) => (
                <li class="list-group-item" key={cat.id}>
                  <div class="row" style={{ cursor: "pointer" }}>
                    <div class="d-flex justify-content-center align-items-center col-md-1">
                      <div class="icon">
                        <img src={star} alt="" />
                      </div>
                    </div>
                    <div class="my-class col-md-8">
                      <div class="text-success">{cat.name}</div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center col-md-1">
                      <img
                        src={trash}
                        alt="Icon Communities"
                        onClick={() => deleteCategory(cat.id)}
                      />
                      <img
                        src={edit}
                        alt="Icon Communities"
                        onClick={() => updateCategory(cat.id)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
