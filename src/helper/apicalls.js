import axios from "axios";

let URL = "http://localhost:3000/";

export const getUser = (username, password) => {
  //
  const fetchURl = `${URL}login?user=${username}&password=${password}`;
  return axios.get(fetchURl);
};

let result;

export const getData = (argument) => {
  return axios
    .get(URL + argument)
    .then((res) => (result = res.data))
    .catch((err) => console.log(err));
};

export const addData = (data, argument) => {
  return axios.post(URL + argument, data);
};

export const deleteData = (id, argument) => {
  return axios.delete(URL + argument + "/" + id);
};

export const updateData = (data, id, argument) => {
  return axios.put(URL + argument + "/" + id, data);
};


export const getDataByID = (id, argument) =>{

  const fetchByIDURL = URL+argument + "/" + id;
  return axios.get(fetchByIDURL).then((res) => (result = res.data)).catch(err => console.log(err));


}