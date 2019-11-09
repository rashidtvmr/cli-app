const ora = require('ora');
 
const spinner = ora('Loading unicorns').start();
 
setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
    spinner.spinner={
        interval: 80, // Optional
        frames: ['-', '+', '/','*']
    }
}, 2000);

setTimeout(()=>{
    spinner.stop();
    spinner.clear()
    process.exit(1)
},5000);
