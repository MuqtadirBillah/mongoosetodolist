const mongoose = require("mongoose");
const Folder = require("../models/folder");
const User = require("../models/user");
const moment = require("moment");
const verifyToken = require("../helpers/verifyToken");
const { verify } = require("jsonwebtoken");

const getFolders = (req, res) => {
    verifyToken(req.headers.token)
        .then((response) => {
            console.log(response)
            Folder.find({ user: response.id}).populate('user', 'email id').exec(function(error, docs){
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(docs)
                    res.send(docs)
                }
            })
        })
        .catch((err) => {
            console.log(err);
            res.send("Something went wrong!");
        })
}

const createFolder = (req, res) => {
    console.log(req.headers.token)
    verifyToken(req.headers.token)
    .then((response)=>{
        console.log(response)
        const folder = new Folder({
            name: req.body.folderName,
            user: response.id,
            creation_date: moment().format("MMMM Do YYYY, h:mm:ss a")
        });
        folder.save(function (err) {
            if (err) {
                console.log(err);
                console.log(err.code);
                if(err.code=='11000'){
                    res.send('folder already exists!');
                }
                else{
                    res.send(`Something went wrong!`);
                }
            }
            else{
                res.send({
                    status: 'success',
                    message: `${req.body.folderName} successfully added!`
                });
            }
        });
    })
    .catch(err=>res.send(err))
}

const viewFolder = (req, res) => {
    verifyToken(req.headers.token)
        .then(response => {
            Folder.findById(req.params.id, (error, docs) => {
                if (error) {
                    console.log(error);
                    res.send(error)
                }
                else {
                    res.send(docs);
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const deleteFolder = (req, res)=>{
    Folder.deleteOne({ _id: req.params.id }, (err, docs)=>{
        if(err) res.send({ status: 'error', message: err })
        else res.send({ status: 'success', message: 'deleted!' })
    })
}

module.exports = {
    getFolders,
    createFolder,
    viewFolder,
    deleteFolder
}