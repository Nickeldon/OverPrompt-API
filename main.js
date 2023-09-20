const { sys } = require('./Side_Functions/System');
const prompt = require('prompt-sync')({sigint: true});
const {validate} = require('./Side_Functions/validate');
const {lobby} = require('./Side_Functions/lobby');
const {Downloader} = require('./Downloader');
const fs = require('fs');
const {speedtester} = require('./Side_Functions/speedtest');
const {Timeout} = require('./Side_Functions/Timeout')
const prompts = require('prompts');
prompts.override(require('yargs').argv);
var jsonop = fs.readFileSync(__dirname + '/Option.json')
const {fileformatin, qualityprop} = require('./loader')
var Optionobj = JSON.parse(jsonop);
var Fchoice
var path;
var verify;
var link;
var fileformat
var sidechoices
var qualityver = 1;
var quality
var choice;
var exception = false;
var pathv
var count = 0;
var property = {
  format: "",
  quality: ""
}

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
  
    async function fileformatprop(){
    do{
      if(!fileformat) sleep(700); lobby();
      if(count !== 0){
        sleep(700);
        lobby();
        console.log('╭───────────────────────────────────────────────────────────────────────────╮');
        console.log('│                                                                           |');
        console.log('│              ❌ PROMPT ERROR: INVALID FILE FORMAT VALUE! ❌              │');        
        console.log('│                                                                           |');
        console.log('│                   Please enter a correct format value                     │');
        console.log('│                           (Possible values)                               |');
        console.log('│                 .mp3, .mp4, .mkv, .aac, .flac, .wav                       |');
        console.log('╰───────────────────────────────────────────────────────────────────────────╯');
      }
      count = 0;
    /*console.log('─────────────────────────────────────────────────────────────────────────────────╮');  
    console.log('   Please choose the file format in which you want the file to be saved          │');
    console.log('─────────────────────────────────────────────────────────────────────────────────╯');*/
    //fileformat = prompt(':> '); console.log('\n')
   fileformat = await fileformatin()
   console.log(fileformat)
      fileformat = fileformat.toLowerCase()
    
    count++
    }while( fileformat !== '.mp3' && fileformat !== 'mp3' && fileformat !== '.aac' && fileformat !== '.mp4' && fileformat !== 'mp4' && fileformat !== 'aac' && fileformat !== 'mkv' && fileformat !== '.mkv' && fileformat !== '.flac' && fileformat !== 'flac'&& fileformat !== '.wav' && fileformat !== 'wav')
    }
    
    fileformatin().then( fileformat => {
      console.log(fileformat)
      if(fileformat === 'mkv' || fileformat === 'aac' || fileformat === 'flac' || fileformat === 'wav' ){
        fileformat = '.' + fileformat
        if(fileformat === 'aac') sidechoices = 'enable-AAC';
        if(fileformat === 'flac') sidechoices = 'enable-FLAC'
        if(fileformat === 'wav') {sidechoices = 'enable-WAV';}
        exception = true
      }
      
          sleep(700)
          lobby()
          var pathf = 0
          if(fileformat === '.mkv' || fileformat === '.aac' || fileformat === '.flac' || fileformat === '.wav' ){
            pathf = 1
            quality = 'greatest'
            nextphase(fileformat, quality)
          }
          else{
            pathf = 0
            qualityprop(pathf).then(quality => {
              nextphase(fileformat, quality)
            })
          }

        /*do{
          if(qualityver === 0){
            sleep(700)
            lobby()
              console.log('╭───────────────────────────────────────────────────────────────────────────╮');
              console.log('│                                                                           |');
              console.log('│                ❌ PROMPT ERROR: INVALID QUALITY VALUE! ❌                 │');        
              console.log('│                                                                           |');
              console.log('│                   Please enter a correct quality value                    │');
              console.log('│          (Possibilities: low, high, greatest (AAC/MKV/FLAC/WAV))          |');
              console.log('╰───────────────────────────────────────────────────────────────────────────╯');
          }
          console.log('─────────────────────────────────────────────────────────────────────────────────╮');  
          console.log('     Please insert the quality of which you want the file to be saved            │');
          console.log('─────────────────────────────────────────────────────────────────────────────────╯');
          quality = prompt(':> '); console.log('\n')
          quality =  quality.toLowerCase()
          qualityver = 0;
      
          if(exception && quality !== 'greatest') quality = ''
          else if(exception && quality === 'high') quality = 'greatest'
      
        }while(quality !== 'low' && quality !== 'lowest' && quality !== 'high' && quality !== 'highest' && quality !== 'greatest')
*/
        function nextphase(fileformat, quality){
        lobby();
          
        switch (fileformat) {
          case '.mp4':
          case 'mp4':
            if (quality === 'high' || quality === 'highest') {
              quality = 'highestvideo';
            } else {
              quality = 'lowestvideo';
            }
            choice = 'videoandaudio';
            fileformat = '.mp4';
            break;
        
          case '.mp3':
          case 'mp3':
            if (quality === 'high' || quality === 'highest') {
              quality = 'highestaudio';
            } else {
              quality = 'lowestaudio';
            }
            choice = 'audioonly';
            fileformat = '.mp3';
            break;
        }
      
          if(Optionobj.speedtester === "true"){
            
          console.log('OverPrompt will measure your connection integrity while you are using the application ')
      
          Timeout(speedtester, 5000)
      }  
                    if(fileformat === ".mp3"){pathv = './Output/MP3/'}
                          else if (fileformat === '.mp4'){path = './Output/MP4'}
                          else if(fileformat === '.mkv') {path = './Output/MKV'}
                          else if(fileformat === '.aac') {path = './Output/AAC'}
                          else if(fileformat === '.flac') {path = './Output/FLAC'}
                          else if(fileformat === '.wav') {path = './Output/WAV'}
      
                          pathv = path + '/'
      
                          if(verify === 2){
                            sys(link, warn).then(() => {
                              lobby()
                              const filePath = './playlist.json'
                              var jsontemp =  fs.readFileSync(filePath)
                              var object = JSON.parse(jsontemp)
                              let loops = object.entities;
                              let abspath
                              abspath = pathv += object.pname 
                              pathv = abspath + '/'
                              
                              console.log('Starting to download the playlist named ', object.pname)
                              for(let i = 0; i<loops; i++){
                                console.log(abspath, pathv)
                                if(object.index[i]){
                                  const title = object.index[i].title
                                  let link = object.index[i].url;
                                  Downloader(pathv, link, fileformat, quality, choice, verify, abspath, sidechoices)
                                  }
                                else{loops = loops - 1;
                                console.error('Unable to proceed to download media number \u001b[31m', (loops + 1))}
                                lobby()
                              }
                              
                            }); 
                          }
                      else if(verify === 1){
                        if(fileformat === '.mkv') {pathv = './Output/MKV/'}
                        else if(fileformat === '.aac') {pathv = './Output/AAC/'}
                        else if(fileformat === '.flac') {pathv = './Output/FLAC/'}
                        else if(fileformat === '.wav') {pathv = './Output/WAV/'}
                        Downloader(pathv, link, fileformat, quality, choice, verify, path, sidechoices)
                      }
                    }    
      
      
    })