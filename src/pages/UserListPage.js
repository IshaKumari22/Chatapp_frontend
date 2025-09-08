import React,{useEffect,useState} from "react";
import {useNavigate}  from "react-router-dom";
import {getUsers} from "../services/api";

const UserListPage=()=>{
    const navigate=useNavigate();
    const [users,setUsers]=useState([]);
    const[error,setError]=useState("");

    useState(()=>{
        const fetchUsers=async()=>{
            try{
                const data=await getUsers();
                setUsers(data);
            }
            catch (err){
                setError("Failed to load users.Please login again");
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
        }
        fetchUsers();
    },[navigate]);

    return(
        <div style={{maxWidth:"600px",margin:"50px auto"}}>
            <h2>User List</h2>
            {error && <p style={{color:"red"}}>{error}</p>}
            <ul>
              {users.map((user)=>(
                <li key={user.id}>
                    {user.username} ({user.email})
                    <button
                    style={{marginLeft:"10px"}}
                    onClick={()=>navigate(`/chat/${user.id}`)}
                    >Chat</button>
                </li>

              ))}  
            </ul>
        </div>
    );
};
export default UserListPage;