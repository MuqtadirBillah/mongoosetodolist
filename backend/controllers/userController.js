const User = require("../models/user");
const verifyToken = require("../helpers/verifyToken");

const getUsers = (req, res) =>{
    verifyToken(req.headers.token)
    .then((response)=>{
        User.find({}, function(error, docs){
            if(error){
                console.log(error)
                res.send("Something went wrong!");
            }
            else{
                console.log(docs)
                res.send(docs);
            }
        })
    })
    .catch((err)=>{
        console.log(err)
        res.send(err);
    })
}

module.exports = {
    getUsers
}