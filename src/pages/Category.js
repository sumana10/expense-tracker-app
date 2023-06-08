//icons
import { star, trash, plus, edit } from "../assets";
//hooks
import { useState, useEffect } from "react";
//custom hooks
import useCategory from "../utils/useCategory";
//api calls
import { addData, updateData, deleteData } from "../helper/apicalls";
//toast messages
import { ToastContainer, toast } from "react-toastify";

const Category = () => {
  
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useCategory();
  const [editCategory, setEditCategory] = useState(null);


  let categoryurl = "category";

  const saveCategory = async() => {

    if(!category){
      alert("Please fill all the fields");
      return;
    }
 
    let newObj = {
      name: category,
    }

    if (editCategory) {
          await updateData(newObj, editCategory.id, categoryurl)
          const updatedCategories = categories.map((cat) =>
            cat.id === editCategory.id ? { ...editCategory, ...newObj } : cat
          )
          setCategories(updatedCategories);
          setEditCategory(null);
          setCategory("");
          toast("Category Updated");
    } else {
        const response = await addData(newObj, categoryurl);
        setCategories(prevCategories => [...prevCategories, response.data]);
        setCategory("");
        toast("Category Added");
    }
  };

  
  const deleteCategory = async(id) =>{

      await deleteData(id, categoryurl);
      const updatedCategories = categories.filter((value) => value.id !== id);
      setCategories(updatedCategories);
      toast("Category Deleted");

  };


  const updateCategory = (id) =>{
    const editCat = categories.find((cat) => cat.id === id)
    setEditCategory(editCat);
    setCategory(editCat.name);
  }



  return (
    <div className="d-flex flex-column mb-auto" style={{ height: "80vh" }}>
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
                onClick={saveCategory}
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
                      <div class="text-success fw-bold">{cat.name}</div>
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
