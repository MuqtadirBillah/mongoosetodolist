import React from "react";
import axios from "axios"
import { Box, TextField } from '@material-ui/core';
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register(){

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function register(){
        if(email.length>0 && password.length>0){
            if(re.test(String(email).toLowerCase())){
                axios.post("http://localhost:5000/api/auth/register", {email: email, password: password})
                .then((response)=>{
                    console.log(response)
                    if(response.data=='added!'){
                        toast(`Account Created!`);
                        navigate("/");
                    }
                    else if(response.data=='User Already Exists!'){
                        toast(`User Already Exists!`);
                    }
                    else if(response.data=='User validation failed' || response.data=='Invalid Email Address!'){
                        toast(`Invalid Email Address!`);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    if(err.response.status=='400'){
                        toast(`${err.response.data.error}`)
                    }
                    else{
                        toast(`Something went wrong!`);
                    }
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
            <Box 
                display="flex" 
                width={500} height={80} 
                bgcolor="lightgreen"
                alignItems="center"
                justifyContent="center"
            >
            <div className="loginForm">
                <div className="heading">
                    <h2>Create an account!</h2>
                </div>
                <div className="form">
                    <TextField id="outlined-basic" onKeyDown={(e)=>{(e.key=='Enter') && register();}} label="Email Address" value={email} fullWidth className="inputField" variant="outlined" onChange={(e)=>setEmail(e.target.value)} InputProps={{ inputProps: { style: { color: '#fff' }}}} />
                    <br />
                    <TextField id="outlined-basic" onKeyDown={(e)=>{(e.key=='Enter') && register();}} label="Password" value={password} fullWidth type="password" className="inputField" variant="outlined" onChange={(e)=>setPassword(e.target.value)} InputProps={{ inputProps: { style: { color: '#fff' }}}} />
                    <br />
                    <p><Link to="/">Already have an account?</Link></p>
                    <button onClick={()=>{register()}}>Signup</button>
                </div>
            </div>
            </Box>
        </div>
    )
}

export default Register;