import axios from "axios";
const API_URL="http://127.0.0.1:8000/api";

export const loginUser=async(username,password)=>{
    const response=await axios.post(`${API_URL}/token/`,{
        username,
        password,
    });
    return response.data;
}
export const getUsers=async()=>{
    const token=localStorage.getItem("accessToken");
    const response=await axios.get(`${API_URL}/users/`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
    return response.data;
}