const ora = import('./node_modules/ora/index').then(ora => {

console.log(ora)
var spinner = ora().start();
spinner = ora().start();

setTimeout(() => {
	spinner.color = 'red';
	spinner.text = 'Loading rainbows';
	spinner.spinner = 'pong'
}, 1000);

})
