let login=[
    {
        type:"input",
        name:"username",
        message:"Enter Username:"
    },
    {
        type:"input",
        name:"password",
        message:"Enter Password"
    }
];

let signup=[
    {
        type:"input",
        name:"username",
        message:"Enter Username:"
    },
    {
        type:"input",
        name:"email",
        message:"Enter Email:"
    },
    {
        type:"input",
        name:"password",
        message:"Enter Password"
    }
];
let comment=[
    {
        type:"input",
        name:"title",
        message:"Enter Comment title:"
    },
    {
        type:"input",
        name:"comment",
        message:"Enter Comment:"
    }
];
module.exports={
    login,signup,comment
}