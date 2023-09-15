  const ytdl = require('ytdl-core');
  const fs = require('fs');
  const path = require('path');
  const {ffmpex} = require('./FFmpex');
  const {lobby} = require('./Side_Functions/lobby');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

        
           module.exports ={   

            Path: function path(){
              return (__dirname)
            },

            Downloader: function Downloader(pathv, link, fileformat, quality, choice, direction, abspath, AACENABLE){

              function confirm(link, fileformat, quality, path){
                console.log(`CHOOSEN PARAMETERS:\n\n (LINK: ${link});                        (FILE FORMAT: ${fileformat});\n\n (QUALITY: ${quality});                                                     (DIRECTORY: ${path})\n\n`)
                    var videotitle;
                    sleep(3000);}
                    function addfolder(pathv){
                      if(direction === 2){
                        const dirpath = path.resolve(abspath);
                        try {
                          if (!fs.existsSync(dirpath)) {
                            fs.mkdirSync(dirpath);
                          }
                        } catch (err) {
                          console.error(err);
                        }
                        }
                    }
                    function verifypath(pathv){
                      addfolder(pathv)
                      const directoryPath = path.resolve(pathv);
                      fs.open(directoryPath, 'w', function(err){if(err) throw err})
                      return directoryPath
                            }

            function titleressourcer(title){
                let n = 0;
                let m = 0
                for (let i = 0; i < title.length; i++) {
                  if(m = 0){
                  console.log('WAITING FOR PHASE 1 OF TITLERESSOURCER.JS \n');
                  sleep(2000);}
                  if (title[i] === '/' || title[i] === '?' || title[i] === '\\' || title[i] === '"' || title[i] === '*' || title[i] === '>' || title[i] === '<' || title[i] === '|' || title[i] === ':') {
                    title = title.substring(0, i) + '_' + title.substring(i + 1);
                  }
                  
                  if(n = 0){
                  console.log('WAITING FOR PHASE 2 OF TITLERESSOURCER.JS \n');
                  sleep(2000);}
                  const chars = /[`~!@#$%^&*()<>?;:'"{},.]/g;
                  title = title.replace(chars, "_");
                  const emojiRegex = /[^\w\s_\p{Emoji}&&[^U+1F1E6-U+1F1FF]]/g;
                  title = title.replace(emojiRegex, "_");
                }
                return title
              }
       function speedlistener(speed, value){
        value = 'Gb/s'
                    if(speed > 10){
                      speed /= 10;
                      value = 'Mb/s';
                    }
                    else if(speed < 1){
                      speed *= 10;
                      value = 'Kb/s';
                      if(speed < 1){
                        speed *= 10;
                        value = 'Bytes/s';
                        /*if(speed < 1){
                          speed *= 10;
                          value = 'Bytes/s';
                        }*/
                      }
                    }
                    return [speed, value]
        }
        function ytdlapi(link, pathv, format, quality, title){
          pathv = verifypath(pathv)
          confirm(link, format, quality, pathv);
          var video;
          function saveToFile(url, pathv){
            lobby()
            return new Promise((resolve) => {
              try{video = ytdl(url, {quality: quality, filter: choice});}catch(error){
                console.log(`\n \x1b[31m YTDL ERROR: Failed to download ${title} \x1b[0m \n`);
              }
              const output = fs.createWriteStream(pathv);
                
                // emit progress events
                let downloadedBytes = 0;
                var timeTaken;
                var speed;
                var bytesd;
                var speedynamic = 0;
                var points = '';
                var startTime = Date.now();
                video.on('progress', (chunkLength, downloadedBytes, totalBytes) => {
                    points += '.';
                    if(points === '.'){points = '.  '}
                      else if(points === '.  .'){points = '.. '}
                      else if(points === '.. .'){points = '...'}
                    var differencetime = (Date.now() - startTime);
                    const percentComplete = downloadedBytes / totalBytes * 100;
                      speedynamic = (downloadedBytes / differencetime/1024/100); var value = 'Mb/s';
                    let speeddata = speedlistener(speedynamic, value)
                      speedynamic = speeddata[0]; value = speeddata[1];
                    process.stdout.write(`\rDownloading${points} ${percentComplete.toFixed(2)}%  |  (${speedynamic.toFixed(2)} ${value})`);
                    if(points === '...'){points = '';}
                      bytesd = totalBytes;
                });
                // emit info event to get video metadata
                let videoInfo = null;
                video.on('info', (info) => {
                    videoInfo = info;
                });
                
                // pipe the video stream to the output file
                video.pipe(output);
                var unit = 'seconds'
                // wait for the download to finish
                output.on('finish', (totalBytes) => {
                    // calculate average download speed
                    timeTaken = (Date.now() - startTime) / 1000; // in seconds
                    if(timeTaken > 100){
                      timeTaken /= 60;
                      unit = 'minutes';
                      if(timeTaken > 100){
                      timeTaken /= 60;
                      unit = 'hours';
                      if(timeTaken > 100){
                        timeTaken /= 24;
                        unit = 'days';
                      }
                      }
                    }
                    var value = 'Mb/s'
                    speed = bytesd / timeTaken / 1024 / 1024; // in MiB/s
                    speedout = speedlistener(speed, value); speed = speedout[0]; value = speedout[1];
                    
                    // clear progress bar
                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    
                    // print download summary
                    const result = `\n \x1b[32mDownloaded ${title} in ${timeTaken.toFixed(2)} ${unit} (avg speed: ${speed.toFixed(2)} ${value})\x1b[0m \n`
                    startTime = 0;
                    console.log(result);
                    resolve();
               });
            });
         
        }
        
          
        startTime = Date.now();
    const savePromise = saveToFile(link, pathv);
    
    savePromise.then(() => {
        console.log('Done!');
        if(direction === 2){
          //lobby()
        }
    }).catch((error) => {
        console.error('Error:', error.message);
    });
}

function mainressourcer (link){
  const timeoutId = setTimeout(() => {
    console.log('Timeout expired, skipping search.');
    return;
  }, 5000);
          ytdl.getInfo(link)
          .then(vinfor => {
            vinfor = titleressourcer(vinfor.videoDetails.title);
            if(fileformat === '.mkv' || fileformat === '.aac' && quality === 'greatest'){
              if(direction === 2) addfolder(abspath)
              while (fs.existsSync('/' + abspath + '/' + vinfor + '.mkv')) console.log('EXISTS !!!'); vinfor += '(1)'
              console.clear()
              lobby()
              if(fileformat === '.mkv') AACENABLE = null
              ffmpex(link, vinfor, abspath, AACENABLE).then(time => {
                time *= 60
                //console.log(`\n \x1b[32mDownloaded ${vinfor} in ${time.toFixed(2)} seconds\x1b[0m \n`)
              })
            }
            else{
            pathv += vinfor + fileformat;
            ytdlapi(link, pathv, fileformat, quality, vinfor);
          }})
          .catch(e =>{
      console.log('╭───────────────────────────────────────────────────────────────────────────╮');
      console.log('│                                                                           |');
      console.log('│        ❌ MEDIA ERROR: INVALID/NON-EXISTANT YOUTUBE MEDIA URL! ❌         │');        
      console.log('│                                                                           |');
      console.log('│                 Please make sure you entered an existant                  │');
      console.log('│                      YouTube media URL and try again.                     |');
      console.log('╰───────────────────────────────────────────────────────────────────────────╯');
       })
          clearTimeout(timeoutId);
}
mainressourcer(link);
       } }