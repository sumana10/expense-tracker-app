import { getUser } from "../helper/apicalls";

export const checkValidateUser = async (username, password) =>{
  return await getUser(username, password).then((res) =>{
    console.log(res.data[0]);

    return res.data[0];
  })
}

export const setAuthentication = () => {
  sessionStorage.setItem("isLoggedIn", true);
};

export const getAuthientication = () =>{
  let value = sessionStorage.getItem("isLoggedIn");
  console.log(value);
  return value;
}

export const clearAuthientication = () => {
  return sessionStorage.clear();
};
