import axios from "axios";

const apiUrl = "http://localhost:3000/"


export const getUser = (username, password) =>{
  const fetchURl = `${apiUrl}login?user=${username}&password=${password}`;
  return axios.get(fetchURl);
}

// Parameters serve as placeholder

export const getData = (param) =>{
  return axios
  .get(apiUrl + param)
  .then((response) => response.data)
  .catch((error) => console.log(error));
}

export const addData = (data, param) =>{
  return axios
  .post(apiUrl + param, data)
  .then((response) => response)
  .catch((error) =>{
    console.error(error);
    throw new Error("Failed to add data");
  })
}

export const deleteData = (id, param) =>{
  return axios.delete(apiUrl + param + "/" + id);
}

export const updateData = (data, id, param) => {
  return axios.put(apiUrl + param + "/" + id, data);
};

export const getDataByID = (id, param) =>{
  const fetchURL = apiUrl + param + "/" + id;
  return axios
  .get(fetchURL)
  .then((res) => res.data)
  .catch((err) => console.log(err));
}