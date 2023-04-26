import { useState, useEffect } from 'react';
import axios from 'axios';



const useCategory = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
  
        getCategories();
       
      }, []);

      let url = "http://localhost:3000/category";

    const getCategories = () =>{

        axios.get(url)
        .then(res => {
            setCategories(res.data);
        })
        .catch(err => console.log(err));
  
      }
  
    

  return [categories, setCategories];
}

export default useCategory