const { sys } = require('./Side_Functions/System');
const prompt = require('prompt-sync')({sigint: true});
const {validate} = require('./Side_Functions/validate');
const {lobby} = require('./Side_Functions/lobby');
const {Downloader} = require('./Downloader');
const fs = require('fs');
const {speedtester} = require('./Side_Functions/speedtest');
const {Timeout} = require('./Side_Functions/Timeout')
var jsonop = fs.readFileSync(__dirname + '/Option.json')
var Optionobj = JSON.parse(jsonop);

var Fchoice
    if(Optionobj.FFmpeg) Fchoice
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

    if(fileformat === 'mkv'){fileformat = '.mkv'}
    if(fileformat === 'aac') fileformat = '.aac'; sidechoices = 'enable-AAC';


    sleep(700)
    lobby()
    var qualityver = 1;
    
  do{
    if(qualityver === 0){
      sleep(700)
      lobby()
        console.log('╭───────────────────────────────────────────────────────────────────────────╮');
        console.log('│                                                                           |');
        console.log('│                ❌ PROMPT ERROR: INVALID QUALITY VALUE! ❌                 │');        
        console.log('│                                                                           |');
        console.log('│                   Please enter a correct quality value                    │');
        console.log('│              (Possibilities: low, high, greatest (AAC/MKV))               |');
        console.log('╰───────────────────────────────────────────────────────────────────────────╯');
    }
    console.log('─────────────────────────────────────────────────────────────────────────────────╮');  
    console.log('     Please insert the quality of which you want the file to be saved            │');
    console.log('─────────────────────────────────────────────────────────────────────────────────╯');
    var quality = prompt(':> '); console.log('\n')
    quality =  quality.toLowerCase()
    qualityver = 0;
    if(fileformat === '.mkv' && quality !== 'greatest') quality = ''
    else if(fileformat === '.aac' && quality !== 'greatest') quality = ''
  }while(quality !== 'low' && quality !== 'lowest' && quality !== 'high' && quality !== 'highest' && quality !== 'greatest')
  lobby();
    var choice;
    if(fileformat === '.mp4' || fileformat === 'mp4' || fileformat === '2'){
      if(quality === 'high' || quality === 'highest'){
          quality = 'highestvideo';
      } else{
          quality = 'lowestvideo';
      }
        choice = 'videoandaudio'; 
        fileformat = '.mp4'
    } else if(fileformat === '.mp3' || fileformat === 'mp3' || fileformat === '1'){
      if(quality === 'high' || quality === 'highest'){
          quality = 'highestaudio';
      } else{
          quality = 'lowestaudio';
      }
        choice = 'audioonly'
        fileformat = '.mp3'
    }

    if(Optionobj.speedtester === "true"){
      
    console.log('OverPrompt will measure your connection integrity while you are using the application ')

    Timeout(speedtester, 5000)
}
      var pathv = './Output/'  
              if(fileformat === ".mp3"){pathv = './Output/MP3/'}
                    else if (fileformat === '.mp4'){pathv = './Output/MP4/'}
                    else if(fileformat === '.mkv') pathv = './Output/MKV/'
                    else if(fileformat === '.aac') pathv = './Output/AAC/'
                    //console.log(pathv)

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
                            console.log('\n Starting to download the track ', title, '...')
                            //console.log(pathv)
                            Downloader(pathv, link, fileformat, quality, choice, verify, abspath, sidechoices)
                            }
                          else{loops = loops - 1;
                          console.error('Unable to proceed to download media number \u001b[31m', (loops + 1))}
                          lobby()
                        }
                        
                      }); 
                    }
                else if(verify === 1){
                  var path;
                  if(fileformat === '.mkv') path = "./Output/MKV"
                  else if (fileformat === '.aac') path = "./Output/AAC"
                  Downloader(pathv, link, fileformat, quality, choice, verify, path, sidechoices)
                }
    


              