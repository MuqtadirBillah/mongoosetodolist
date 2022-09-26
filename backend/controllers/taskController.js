const folder = require("../models/folder");
const Task = require("../models/task");
const moment = require("moment");
const task = require("../models/task");


const getTasks = (req, res) => {
    console.log(req.params.id)
    task.find({ folder: req.params.id }).populate('folder','name').exec(function(err, data){
        if(err) res.send({ status: `error`, message: err })
        else res.send({ status: `success`, message: data })
    })
}

const createTask = (req, res)=>{
    const task = new Task({
        task: req.body.task,
        folder: req.body.folderId,
        creation_date: moment().format("MMMM Do YYYY, h:mm:ss a")
    })
    task.save((error, funcResponse)=>{
        if(error) res.send({ status: `error`, messsage: error })
        else res.send({
            status: 'success',
            message: `${req.body.task} added to current folder`
        });
    })
}

const deleteTask = (req, res)=>{
    Task.deleteOne({ _id: req.params.id }, (err, docs)=>{
        if(err) res.send({ status: 'error', message: err })
        else res.send({ status: 'success', message: 'deleted!' })
    })
}

module.exports = {
    createTask,
    getTasks,
    deleteTask
}