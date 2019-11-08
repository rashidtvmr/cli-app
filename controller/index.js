
const axios=require('../config/axios');
const fs=require('fs');
const {prompt}=require('inquirer');

let userController={};
let commentController={};

let {login,signup,comment}=require('./prompt');


userController.login=()=>{
    if(fs.existsSync('./key.json')){
        console.log("You're already loggedin!!!");
    }else{
        prompt(login).then(answer=>{
            axios.post('/user/login',{
                username:answer.username,
                password:answer.password
            }).then(result=>{
                fs.writeFileSync('key.json',JSON.stringify({api_key:result.data.token}));
                console.log("Logged in successfully");
                process.exit(1);
            }).catch(err=>{
                console.log(err.response.data.msg);
                process.exit(1);
            });
        });
    }
}

userController.signup=()=>{
    if(fs.existsSync('./key.json')){
        console.log("You're already loggedin");
    }else{
        prompt(signup).then(answer=>{
            axios.post('/user',{
                username:answer.username,
                email:answer.email,
                password:answer.password,
            }).then(result=>{
                fs.writeFileSync('key.json',JSON.stringify({api_key:result.data.token}));
                console.log("You logged in!!!");
                process.exit(1);
            }).catch(err=>{
                console.log(err.response.data.msg);
                process.exit(1);
            });
        });
    }
    
}

userController.logout=()=>{
    if(!fs.existsSync('./key.json')){
        console.log("You must login to logout");
    }else{
        if(!fs.unlinkSync('./key.json')){
            console.log("Logout successfully!!!")
            process.exit(1);
        }else{
            console.log("Unable to Logout")
            process.exit(1);
        }
    }
    
}

commentController.postComment=()=>{
    if(fs.existsSync('./key.json')){
        let key=JSON.parse(fs.readFileSync('./key.json')).api_key;
        prompt(comment).then(answer=>{
            axios.post('/cmnt',{
                title:answer.title,
                comment:answer.comment
            },{
                headers:{
                    "Authorization":`Bearer ${key}`
                }
            }).then(result=>{
                console.log(result.data.msg);
                process.exit(1);
            }).catch(err=>{
                console.log(err.response.data.msg);
                process.exit(1);
            });
        })
    }else{
        console.log("Please login to perform this operation.");
        console.log(process.exit(1));
    }
}

module.exports={
    userController,
    commentController
}