const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const nodeoutlook = require("nodejs-nodemailer-outlook");

const login = (req, res) =>{
    User.find({ email: req.body.email}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log(docs);
            if(docs.length>0){
                if(bcrypt.compareSync(req.body.password, docs[0].password)){
                    var token = jwt.sign({ id: docs[0]._id, email: docs[0].email, username: docs[0].username }, process.env.secret_key);
                    res.send({
                        status: "success",
                        token: token
                    })
                }
                else{
                    res.send("Invalid Credentials!");
                }
            }
            else{
                res.send("Invalid Credentials!");
            }
        }
    });
}

const register = async (req, res)=>{
    console.log(req.body)
    if(req.body.password.length>5){
        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(req.body.password, salt);    try {
            const user = await new User({
                email: req.body.email,
                password: passwordHash,
                username: req.body.username,
                creation_date: moment().format("MMMM Do YYYY, h:mm:ss a"),
                pin: Math.floor(Math.random() * (9999 - 0001) + 0001)
            })
            await user.save()
            res.send('added!')
        } catch (err) {
            console.log(err)
            if(err.code=='11000'){
                res.send('User Already Exists!');
            }
            else if(err._message){
                // console.log(err.errors.email.properties.message);
                console.log(Object.keys(err.errors)[0])
                var errorKey = Object.keys(err.errors)[0];
                console.log(`----------------------`)
                console.log(err.errors.errorKey.properties.message)
                console.log(`----------------------`)
                if(err.errors.email){
                    res.status(400).json({ error: err.errors.email.properties.message });
                }
                else if(err.errors.password){                
                    res.status(400).json({ error: err.errors.password.properties.message });
                }
            }
            // else if(err._message){
            //     // console.log(err._message)
            //     res.status(400).json({error: err._message});
            //     // res.status(400).json({error: err._message});
            // }
            else{
                res.send('Something went wrong!')
            }
        }
    }
    else{
        res.status(400).json({ error: 'Please enter at least 6 characters in Password!'})
    }
}

const sendCode = (req, res) =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(req.body.email).toLowerCase())){
        User.find({ email: req.body.email }, function (err, docs) {
            if (err){
                console.log(err);
                res.send(`Something went wrong!`);
            }
            else{
                if(docs.length>0){
                    nodeoutlook.sendEmail({
                        auth: {
                            user: "voice-recorder@outlook.com",
                            pass: process.env.OUTLOOK_PASSWORD
                        },
                        from: 'voice-recorder@outlook.com',
                        to: `${req.body.email}`,
                        subject: `Verification Code`,
                        html: `<p>Respected Sir/Madam,<br />Your verification code is ${docs[0].pin}<p>Best Regards</p>`,
                        replyTo: 'voice-recorder@outlook.com',
                        attachments: [],
                        onError: (e) => {console.log(e); res.send('Something went wrong!')},
                        onSuccess: (i) => {console.log(i); res.send('sent!')}
                    });
                }
                else{
                    res.send('Email Address does not exists!');
                }
            }
        });
    }
    else{
        res.send("Invalid Email Address!");
    }
}

const resetPassword = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var passwordHash = bcrypt.hashSync(req.body.password, salt);
    User.find({ email: req.body.email }, function (err, docs) {
        if (err){
            console.log(err);
            res.send(`Something went wrong!`);
        }
        else{
            console.log(docs);
            if(docs.length>0){
                if(req.body.pin==docs[0].pin){
                    User.updateOne({email: req.body.email}, 
                        {password:passwordHash}, function (err, docs) {
                        if (err){
                            console.log(err)
                            res.send(`Something went wrong!`)
                        }
                        else{
                            res.send(`Updated!`)
                        }
                    });
                }
                else{
                    res.send("Invalid Pin!");
                }
            }
            else{
                res.send("Invalid Email Address!");
            }
        }
    });
}

module.exports = {
    login,
    register,
    sendCode,
    resetPassword
}