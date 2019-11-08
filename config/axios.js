const axios=require('axios');
let instance=axios.create({
    baseURL:"https://cli-main.herokuapp.com/api/v1"
    // baseURL:"http://localhost:4938/api/v1"
})


module.exports=instance;