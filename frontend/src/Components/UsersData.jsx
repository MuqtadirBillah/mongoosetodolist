import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

function UserData(){

    var [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(Cookies.get("userCookie")){
            axios.get("http://localhost:5000/api/user/all", { headers: {
                token: Cookies.get("userCookie")
            }})
            .then((response)=>{
                console.log(response)
                if(response.data=='Unauthorized User!'){
                    navigate("/");
                }
                else if(response.data=='Something went wrong!'){
                    toast(`Something went wrong!`);
                    navigate("/");
                }
                else{
                    setData(response.data);
                }
            })
            .catch((e)=>{
                console.log(e)
            })
        }
        else{
            navigate("/");
        }
    }, [])

    function logout(){
        Cookies.remove("userCookie");
        navigate("/")
    }

    return(
        <div className="userData">
            <Navigation />
            <button onClick={()=>{logout()}}>Logout</button>
            {
                data?.map((d)=>{
                    return(
                        <div>
                            <hr />
                            <h3>Id</h3>
                            <p>{d._id}</p>
                            <h3>Email Address</h3>
                            <p>{d.email}</p>
                            <h3>Password</h3>
                            <p>{d.password}</p>
                            <h3>Creation Date</h3>
                            <p>{d.creation_date}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserData;