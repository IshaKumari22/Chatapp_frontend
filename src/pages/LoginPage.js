import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../services/api";

const LoginPage=()=>{
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");


    const handleLogin=async(e)=>{
        e.preventDefault();
        setError("");

        try{
           const data = await loginUser(username,password);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("username", username);


navigate("/users");
        }catch(err){
            setError("Login failed");
        }
    }
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const data = await loginUser(username, password);

//     localStorage.setItem("accessToken", data.access);
//     localStorage.setItem("refreshToken", data.refresh);
//       localStorage.setItem("username", username);
//     alert(error);
//     navigate("/users");
//     window.location.href="/users";
//   } catch (error) {
//     alert("Login failed!");
//   }
// };

    return (
        <div style={{maxWidth:"400px",margin:"50px auto"}}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input 
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                    />
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Password :</label>
                    <input 
                    type="password"
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)}
                        required
                        />
                </div>
                {error && <p style={{color:"red"}}>{error}</p>}
                <button type="submit" style={{marginTop:"15px"}}>
                Login
                </button>
            </form>
        </div>

    )
}


export default LoginPage;