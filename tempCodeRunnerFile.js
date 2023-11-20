/*const { sys } = require('./Side_Functions/System');
const prompt = require('prompt-sync')({sigint: true});
const {validate} = require('./Side_Functions/validate');
const {lobby} = require('./Side_Functions/lobby');
const {Downloader} = require('./Downloader');
const fs = require('fs')

function phase1(link){  
    console.log('──────────────────────────────────────────────────────────────────╮');  
    console.log('   Insert the media link that you want to download                │');
    console.log('──────────────────────────────────────────────────────────────────╯');
    link = prompt(':> ');
    console.log('\n')
    return link}
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      var verify;
      var link;
      console.clear()
      sleep(1500)    
      lobby()
  
      do{
        if(verify === 0){
          console.clear();
          sleep(500)   
          lobby()
          console.log('╭───────────────────────────────────────────────────────────────────────────╮');
          console.log('│                                                                           |');
          console.log('│               ❌ ENTRY ERROR: INVALID YOUTUBE MEDIA URL! ❌              │');        
          console.log('│                                                                           |');
          console.log('│   Please make sure you entered a valid YouTube media URL and try again.   │');
          console.log('│                                                                           |');
          console.log('╰───────────────────────────────────────────────────────────────────────────╯');
        }
          link = phase1(link);
  
    verify = validate(link, verify)
    }while(verify !== 1 && verify !== 2)
  
    do{
      if(!fileformat) sleep(700); lobby();
      if(fileformat && fileformat !== '.mp3' && fileformat !== 'mp3' && fileformat !== '1' && fileformat !== '.mp4' && fileformat !== 'mp4' && fileformat !== 2){
        sleep(700);
        lobby();
        console.log('╭───────────────────────────────────────────────────────────────────────────╮');
        console.log('│                                                                           |');
        console.log('│              ❌ PROMPT ERROR: INVALID FILE FORMAT VALUE! ❌              │');        
        console.log('│                                                                           |');
        console.log('│                   Please enter a correct format value                     │');
        console.log('│        (Possible values : .mp3, .mp4, .mkv , .aac (Greatest only))        |');
        console.log('╰───────────────────────────────────────────────────────────────────────────╯');
      }
    console.log('─────────────────────────────────────────────────────────────────────────────────╮');  
    console.log('   Please choose the file format in which you want the file to be saved          │');
    console.log('─────────────────────────────────────────────────────────────────────────────────╯');
    var fileformat = prompt(':> '); console.log('\n')
    fileformat = fileformat.toLowerCase()
    }while( fileformat !== '.mp3' && fileformat !== 'mp3' && fileformat !== '.aac' && fileformat !== '.mp4' && fileformat !== 'mp4' && fileformat !== 'aac' && fileformat !== 'mkv' && fileformat !== '.mkv')
    
    let sidechoices;
    console.log(fileformat)
    if(fileformat === 'mkv'){fileformat = '.mkv'}
    if(fileformat === 'aac') fileformat = '.aac'; sidechoices = 'enable-AAC';*/

    /*function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const clearLastLine = () => {
      process.stdout.moveCursor(0, -1) // up one line
      process.stdout.clearLine(1) // from cursor to end
    }
    function lobby(){
      console.clear();
      console.log('\x1b[34m  _|_|    _|      _|  _|_|_|_|  _|_|_|    _|_|_|    _|_|_|      _|_|    _|      _|  _|_|_|    _|_|_|_|_|\n_|    _|  _|      _|  _|        _|    _|  _|    _|  _|    _|  _|    _|  _|_|  _|_|  _|    _|      _|    \n_|    _|  _|      _|  _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|    _|  _|  _|  _|  _|_|_|        _|    \n_|    _|    _|  _|    _|        _|    _|  _|        _|    _|  _|    _|  _|      _|  _|            _|    \n  _|_|        _|      _|_|_|_|  _|    _|  _|        _|    _|    _|_|    _|      _|  _|            _|   \x1b[0m \n');
      process.stdout.write(`\x1b[31m ════════════════════════════════════╣ YOUTUBE MEDIA DOWNLOADER ╠════════════════════════════════════ \x1b[0m`);
      var bar = '';
var spaces = '';
setInterval(bars, 2000)
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


      /*path = __dirname + '/connectionwarning.json'
      var json = fs.readFileSync(path)
      var object = JSON.parse(json)
      if(object.stability === "slowed"){
        console.log('\n╭─────────────────────────────────────────────────────────────────────────────────────╮')
        console.log('|    🌐 Service quality may be poorly affected due to the client\'s connection speed   │')
        console.log('╰─────────────────────────────────────────────────────────────────────────────────────╯');
        }*/
      //path = __dirname + '/downlog.txt'
      /*try{
      const file = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        terminal: false
      })

      file.on('line', (line) => {
        console.log('\x1b[32m',line, '\x1b[0m')
      })}catch(e){

      }*/
        
    /*}
    lobby()*/

const ytpl = require('ytpl')
const ytdl = require('ytdl-core')
let link = "https://www.youtube.com/playlist?list=PL5OQUkTRJ6cK1TYTbEHDdSV3itjmIqu1_"

ytpl(link).then(infor => {
console.log(infor)
})

