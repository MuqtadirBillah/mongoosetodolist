import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import axios from "axios";
import Navigation from "./Navigation"
import { IconName } from "react-icons/bs";

function FolderView(){

    let { id } = useParams();
    var navigate = useNavigate();
    var [folderData, setFolderData] = useState();
    var [taskData, setTaskData] = useState();
    var [taskName, setTaskName] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/task/view/${id}`, { headers: { token: Cookies.get("userCookie") } })
        .then((response)=>{
            console.log(response);
            setFolderData(response.data.message[0].folder);
            setTaskData(response.data.message)
        })
        .catch(err=>{
            console.log(err)
        })
    }, []);

    function getFolderData(){
        axios.get(`http://localhost:5000/api/task/view/${id}`, { headers: { token: Cookies.get("userCookie") } })
        .then((response)=>{
            console.log(response);
            setFolderData(response.data.message[0].folder);
            setTaskData(response.data.message)
        })
        .catch(err=>{
            console.log(err);
            setTaskData([])
        })
    }

    function createTask(){
        if(taskName.length>0){
            axios.post("http://localhost:5000/api/task/create", {
                task: taskName,
                folderId: id
            })
            .then((response)=>{
                console.log(response)
                if(response.data.status=='success'){
                    toast(`${response.data.message}`)
                    getFolderData();
                }
            })
            .catch((error)=>{
                toast(`Something went wrong!`)
            })
        }
    }

    function deleteTask(taskId){
        axios.get(`http://localhost:5000/api/task/delete/${taskId}`)
        .then((response)=>{
            console.log(response)
            if(response.data.message=='Not found!'){
                toast(`Something went wrong!`);
            }
            else if(response.data.status=='success'){
                toast(`Task deleted!`);
                getFolderData();
            }
            else if(response.data.status=='error'){
                toast(`Something went wrong!`);
            }
        })
        .catch((error)=>{
            toast(`Something went wrong!`)
        })
    }

    function deleteFolder(){
        axios.get(`http://localhost:5000/api/folder/delete/${id}`)
        .then((response)=>{
            if(response.data.status=='success'){
                toast(`Folder deleted!`)
                navigate('/folders');
            }
            else if(response.data.status=='error'){
                toast(`Something went wrong!`);
            }
        })
        .catch((err)=>{
            toast(err);
        })
    }

    return(
        <>            
            <Navigation />
            <div className="container">
                <div className="folderView">
                    <div className="foldersTab">
                        <div className="foldersHead">
                            <div className="row">
                                <div className="col-6">
                                    <h4>{folderData?.name}</h4>
                                </div>
                                <div className="col-6 controlsButtons">
                                    <button className="deleteBut" onClick={()=>{deleteFolder()}}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="createTask">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-md-8 col-s-6 coll">
                                        <input type="text" onKeyDown={(e)=>{(e.key=='Enter') && createTask()}} value={taskName} onChange={(e)=>{(taskName.length<35) && setTaskName(e.target.value)}} placeholder="Task Name" name="" id="" />
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-s-6 coll">
                                        <button onClick={()=>createTask()}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="statusBar">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-2 col-md-3 col-sm-12">
                                        <p><i class="fas fa-check-square pendingIcon"></i> Pending</p>
                                    </div>
                                    <div className="col-lg-2 col-md-3 col-sm-12">
                                        <p><i class="fas fa-check-square completedIcon"></i> Completed</p>
                                    </div>
                                    <div className="col-lg-2 col-md-3 col-sm-12">
                                        <p><i class="fas fa-bug bugIcon"></i> Bug Found</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="folderBody">
                            <div className="container">
                                {
                                    taskData?.map((t)=>{
                                        return(
                                            <div className="singleTask">
                                                <div className="capsule" title={`${t.task}\n${t.creation_date}`}>
                                                    <h5>{t.task}</h5>
                                                    <div className="controls">
                                                        <button className="deleteBut" onClick={()=>{deleteTask(t._id)}} title={`delete ${t.task}`}><i className="far fa-trash-alt"></i></button>
                                                        <div className="dropdown">
                                                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i class="fas fa-check-square pendingIcon"></i>
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                                <li><a className="dropdown-item" href="#"><i class="fas fa-check-square pendingIcon"></i> Pending</a></li>
                                                                <li><a className="dropdown-item" href="#"><i class="fas fa-check-square completedIcon"></i> Completed</a></li>
                                                                <li><a className="dropdown-item" href="#"><i class="fas fa-bug bugIcon"></i> Bug Found</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FolderView;