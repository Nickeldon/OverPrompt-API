
const fs = require('fs');
const readline = require('readline')
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = { 
    lobby: function lobby(extention){
      console.clear();
      console.log('\x1b[34m  _|_|    _|      _|  _|_|_|_|  _|_|_|    _|_|_|    _|_|_|      _|_|    _|      _|  _|_|_|    _|_|_|_|_|\n_|    _|  _|      _|  _|        _|    _|  _|    _|  _|    _|  _|    _|  _|_|  _|_|  _|    _|      _|    \n_|    _|  _|      _|  _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|    _|  _|  _|  _|  _|_|_|        _|    \n_|    _|    _|  _|    _|        _|    _|  _|        _|    _|  _|    _|  _|      _|  _|            _|    \n  _|_|        _|      _|_|_|_|  _|    _|  _|        _|    _|    _|_|    _|      _|  _|            _|   \x1b[0m \n');
      process.stdout.write(`\x1b[31m ════════════════════════════════════╣ YOUTUBE MEDIA DOWNLOADER ╠════════════════════════════════════ \x1b[0m\n\n`);
      var bar = '';
var spaces = '';
/*
if(false){
async function bars(){
  for (let i = 0; i < 36; i++) {
    await sleep(20)
      bar += '═';
      spaces = Array(36 - i).join(' ');
      process.stdout.clearLine(); // Clear the previous line
      process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
      process.stdout.write(`\x1b[31m ${bar}${spaces}╣ YOUTUBE MEDIA DOWNLOADER ╠${spaces}${bar} \x1b[0m`);
      if(i === 35){bar = ''; spaces = ''}
    
    
    }
  
}
bars().finally}*/


      /*path = __dirname + '/connectionwarning.json'
      var json = fs.readFileSync(path)
      var object = JSON.parse(json)
      if(object.stability === "slowed"){
        console.log('\n╭─────────────────────────────────────────────────────────────────────────────────────╮')
        console.log('|    🌐 Service quality may be poorly affected due to the client\'s connection speed   │')
        console.log('╰─────────────────────────────────────────────────────────────────────────────────────╯');
        }*/
      path = __dirname + '/downlog.txt'
      try{
      const file = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        terminal: false
      })

      file.on('line', (line) => {
        console.log('\x1b[32m',line, '\x1b[0m')
      })}catch(e){

      }
        
    }
  }