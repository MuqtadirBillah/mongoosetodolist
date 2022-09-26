import React from "react";
import axios from "axios"
import { Box, TextField } from '@material-ui/core';
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login(){

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function login(){
        if(email.length>0 && password.length>0){
            if(re.test(String(email).toLowerCase())){
                axios.post("http://localhost:5000/api/auth/login", {email: email, password: password})
                .then((response)=>{
                    console.log(response)
                    if(response.data?.status=='success'){
                        toast(`Success!`);
                        Cookies.set("userCookie", response.data.token)
                        navigate("/folders");
                    }
                    else if(response.data=='Invalid Credentials!'){
                        toast(`Invalid Credentials!`);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    toast(`Something went wrong!`);
                })
            }
            else{
                toast("Invalid Email Address");
            }
        }
        else{
            toast("Please fill all fields");
        }
    }

    return(
        <div className="login">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <div className="loginForm">
                <div className="heading">
                    <h2>Login</h2>
                    <p>Welcome Back!</p>
                </div>
                <div className="form">
                    <TextField id="outlined-basic" label="Email Address" onKeyDown={(e)=>{(e.key=='Enter') && login();}} value={email} fullWidth className="inputField" variant="outlined" onChange={(e)=>setEmail(e.target.value)} InputProps={{ inputProps: { style: { color: '#fff' }}}} />
                    <br />
                    <TextField id="outlined-basic" label="Password" onKeyDown={(e)=>{(e.key=='Enter') && login();}} value={password} fullWidth type="password" className="inputField" variant="outlined" onChange={(e)=>setPassword(e.target.value)} InputProps={{ inputProps: { style: { color: '#fff' }}}} />
                    <br />
                    <p><Link to="/register">Don't have an account?</Link></p>
                    <p><Link to="/reset-password">Forgot Password?</Link></p>
                    <button onClick={()=>{login()}}>Login</button>
                </div>
            </div>
            </Box>
        </div>
    )
}

export default Login;