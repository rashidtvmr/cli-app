#!/usr/bin/env node

const { description, version } = require('./package.json');

const command=require('commander');

const program = require('commander')

const { userController,commentController}=require('./controller/index');


program
 .description(description)
 .version(version,"-v,--version")

program
    .command('login')
    .alias('l')
    .description("Log into this app")
    .action(()=>{ userController.login() });

program
    .command('signup')
    .alias('r')
    .description("Create a new account")
    .action(()=>{ userController.signup()});

program
    .command('logout')
    .alias('lo')
    .description("Delete Key File")
    .action(()=>{ userController.logout()});
program
    .command('comment')
    .alias('_c')
    .description("Post a comment")
    .action(()=>{
       commentController.postComment();
});

program
    .parse(process.argv);