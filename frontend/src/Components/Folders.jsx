import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";

function Folders(){

    var [folders, setFolders] = useState([]);
    var [folderName, setFolderName] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:5000/api/folder/all", { headers: { token: Cookies.get("userCookie") } })
        .then((response)=>{
            console.log(response);
            if(response.data!='Something went wrong!'){
                setFolders(response.data);
            }
            else{
                toast(`Something went wrong!`);
            }
        })
        .catch((error)=>{
            console.log(error)
            toast(`Something went wrong!`);
        })
    }, [])

    function getFolders(){
        axios.get("http://localhost:5000/api/folder/all", { headers: { token: Cookies.get("userCookie") } })
        .then((response)=>{
            console.log(response);
            if(response.data!='Something went wrong!'){
                setFolders(response.data);
            }
            else{
                toast(`Something went wrong!`);
            }
        })
        .catch((error)=>{
            console.log(error)
            toast(`Something went wrong!`);
        })
    }

    function createFolder(){
        if(folderName.length>0){
            axios.post("http://localhost:5000/api/folder/create", { folderName: folderName }, { headers: { token: Cookies.get("userCookie") } })
            .then((response)=>{
                console.log(response);
                if(response.data.status=='success'){
                    toast(response.data.message)
                    getFolders();
                }
                else if(response.data==`folder already exists!`){
                    toast(`Folder with similar name already exists!`)
                }
                else{
                    toast(`Something went wrong!`);
                }
            })
            .catch((error)=>{
                console.log(error);
                toast(`Something went wrong!`);
            })
        }
        else{
            toast(`Folder name cannot be empty.`)
        }
    }

    return(
        <div className="foldersPage">
            <Navigation />
            <div className="container">
                <div className="foldersTab">
                    <div className="foldersHead">
                        <div className="row">
                            <div className="col-6">
                                <h4>My Folders</h4>
                            </div>
                        </div>
                    </div>
                    <div className="foldersBody">
                        <div className="createFolder">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-md-8 col-s-6 coll">
                                        <input type="text" onKeyDown={(e)=>{(e.key=='Enter') && createFolder()}} onChange={(e)=>{setFolderName(e.target.value)}} placeholder="Folder Name" name="" id="" />
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-s-6 coll">
                                        <button onClick={()=>createFolder()}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="folders">
                            <div className="row">
                                {
                                    folders.map((f)=>{
                                        return(
                                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 folderCol">       
                                                <Link to={`/folder/view/${f._id}`}>
                                                    <img src="/assets/images/folder.png" alt="" />
                                                    <h5>{f.name}</h5>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Folders;