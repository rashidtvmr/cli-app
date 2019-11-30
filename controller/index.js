
const axios=require('../config/axios');
const fs=require('fs');
const {prompt}=require('inquirer');
const ora=require('ora')
const chalk=require('chalk')
const figlet=require('figlet');
let userController={};
let commentController={};

let {login,signup,comment}=require('./prompt');



userController.login=()=>{
    if(fs.existsSync('./key.json')){
        ora().succeed("You're already logged in!!!");
    }else{
        prompt(login).then(answer=>{
            ora('Please wait while we process your input!!').start();
            axios.post('/user/login',{
                username:answer.username,
                password:answer.password
            }).then(result=>{
                ora().stop();
                fs.writeFileSync('key.json',JSON.stringify({api_key:result.data.token}));
                // ora().succeed("\t----------  You are Logged into  -----------\t");
                showLoggedInMessage();
            }).catch(err=>{
                ora().fail(err.response.data.msg);
                process.exit(1);
            });
        });
    }
}

userController.signup=()=>{
    if(fs.existsSync('./key.json')){
        ora().succeed("You're already loggedin!!!");
    }else{
        prompt(signup).then(answer=>{
            axios.post('/user',{
                username:answer.username,
                email:answer.email,
                password:answer.password,
            }).then(result=>{
                fs.writeFileSync('key.json',JSON.stringify({api_key:result.data.token}));
                // ora().succeed("\tYou are Logged into\t");
                showLoggedInMessage();
            }).catch(err=>{
                ora().fail(err.response.data.msg);
                // console.log(err.response.data.msg);
                process.exit(1);
            });
        });
    }
    
}

userController.logout=()=>{
    if(!fs.existsSync('./key.json')){
       ora().warn("You must login to logout");
    }else{
        if(!fs.unlinkSync('./key.json')){
            showLogoutMessage();
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

function showInnerPeace(){
    
}
function showLogoutMessage(){
    figlet('Inner Peace', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        console.log("\t --------- Logged out successfully ---------");        
        process.exit(1);
    });
}
function showLoggedInMessage(){
    console.log("\n\n\t --------- You are logged into ---------");        
    figlet('Inner Peace', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        process.exit(1);
    });
}