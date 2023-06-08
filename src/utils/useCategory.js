import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../config';


const useCategory = () => {

    const [categories, setCategories] = useState([]);

      useEffect(() =>{
        getCategories();
      }, [])

      let url = `${URL}/category`;

  
    const getCategories = () =>{

        axios.get(url)
        .then(res =>{
          setCategories(res.data);
        })
        .catch(err => console.log(err));
  
      }
  
  return [categories, setCategories];
}

export default useCategory