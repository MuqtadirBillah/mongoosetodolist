import React from "react";
import axios from "axios"
import { Box, TextField } from '@material-ui/core';
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function ResetPassword(){

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [pin, setPin] = useState('');
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function reset(){
        if(email.length>0 && password.length>0){
            if(re.test(String(email).toLowerCase())){
                axios.post("http://localhost:5000/api/auth/reset-password", {email: email, password: password, pin: pin})
                .then((response)=>{
                    console.log(response)
                    if(response.data=='Updated!'){
                        toast(`Password successfully changed!`);
                    }
                    else if(response.data=='Invalid Credentials!'){
                        toast(`Invalid Credentials!`);
                    }
                    else if(response.data=='Invalid Pin!'){
                        toast(`Invalid Pin!`);
                    }
                    else if(response.data=='Invalid Pin!'){
                        toast(`Invalid Pin!`);
                    }
                    else if(response.data=='Invalid Email Address!'){
                        toast(`Invalid Email Address!`);
                    }
                    else{
                        toast(`Something went wrong!`);
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

    function sendCode(){
        if(email.length>0){
            if(re.test(String(email).toLowerCase())){
                axios.post("http://localhost:5000/api/auth/send-code", { email: email})
                .then((response)=>{
                    console.log(response);
                    if(response.data=='sent!'){
                        toast(`Code sent to your email`);
                    }
                    else if(response.data=='Invalid Email Address!'){
                        toast(`Invalid Email Address!`);
                    }
                    else{
                        toast(`Something went wrong!`);
                    }
                })
                .catch(err=>{
                    toast(`Something went wrong!`);
                })
            }
            else{
                toast(`Invalid Email Address!`);
            }
        }
        else{
            toast(`Please enter your email`);
        }
    }

    return(
        <div className="login">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <div className="loginForm">
                <div className="heading">
                    <h2>Reset Password</h2>
                </div>
                <div className="form">
                    <TextField id="outlined-basic" label="Email Address" onKeyDown={(e)=>{(e.key=='Enter') && reset();}} value={email} fullWidth className="inputField" variant="outlined" onChange={(e)=>setEmail(e.target.value)} InputProps={{ inputProps: { style: { color: '#fff' }}}} />
                    <br />
                    <TextField id="outlined-basic" label="New Password" onKeyDown={(e)=>{(e.key=='Enter') && reset();}} value={password} fullWidth type="password" className="inputField" variant="outlined" onChange={(e)=>setPassword(e.target.value)} InputProps={{ inputProps: { style: { color: '#fff' }}}} />
                    <br />
                    <TextField id="outlined-basic" label="Pin Code" onKeyDown={(e)=>{(e.key=='Enter') && reset();}} value={pin} fullWidth type="Number" className="inputField" variant="outlined" onChange={(e)=>setPin(e.target.value)} InputProps={{ inputProps: { style: { color: '#fff' }}}} />
                    <br />
                    <p><Link to="/">Login Now</Link></p>
                    <button onClick={()=>{reset()}}>Reset</button>
                    <button onClick={()=>{sendCode()}}>Send Code</button>
                </div>
            </div>
            </Box>
        </div>
    )
}

export default ResetPassword;