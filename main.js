  const ytdl = require('ytdl-core');
  const fs = require('fs');
  const path = require('path');
  const { time } = require('console');
  const cp = require('child_process');
  const readline = require('readline');
  const ffmpeg = require('ffmpeg-static');
  const prompt = require('prompt-sync')({sigint: true});
  function lobby(){console.clear();console.log('  _|_|    _|      _|  _|_|_|_|  _|_|_|    _|_|_|    _|_|_|      _|_|    _|      _|  _|_|_|    _|_|_|_|_|\n_|    _|  _|      _|  _|        _|    _|  _|    _|  _|    _|  _|    _|  _|_|  _|_|  _|    _|      _|    \n_|    _|  _|      _|  _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|    _|  _|  _|  _|  _|_|_|        _|    \n_|    _|    _|  _|    _|        _|    _|  _|        _|    _|  _|    _|  _|      _|  _|            _|    \n  _|_|        _|      _|_|_|_|  _|    _|  _|        _|    _|    _|_|    _|      _|  _|            _|    \n');console.log('════════════════════════════════════╣ YOUTUBE MEDIA DOWNLOADER ╠════════════════════════════════════');console.log('\n\n')}
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
    function greatest(link, title){
      const tracker = {
        start: Date.now(),
        audio: { downloaded: 0, total: Infinity },
        video: { downloaded: 0, total: Infinity },
        merged: { frame: 0, speed: '0x', fps: 0 },
      };
      
      // Get audio and video streams
      const audio = ytdl(link, { quality: 'highestaudio' })
        .on('progress', (_, downloaded, total) => {
          tracker.audio = { downloaded, total };
        });
      const video = ytdl(link, { quality: 'highestvideo' })
        .on('progress', (_, downloaded, total) => {
          tracker.video = { downloaded, total };
        });
      
      // Prepare the progress bar
      let progressbarHandle = null;
      const progressbarInterval = 1000;
      const showProgress = () => {
        readline.cursorTo(process.stdout, 0);
        const toMB = i => (i / 1024 / 1024).toFixed(2);
      
        process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
        process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);
      
        process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
        process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);
      
        process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
        process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);
      
        process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
        readline.moveCursor(process.stdout, 0, -3);
      };
      
      // Start the ffmpeg child process
      const ffmpegProcess = cp.spawn(ffmpeg, [
        // Remove ffmpeg's console spamming
        '-loglevel', '8', '-hide_banner',
        // Redirect/Enable progress messages
        '-progress', 'pipe:3',
        // Set inputs
        '-i', 'pipe:4',
        '-i', 'pipe:5',
        // Map audio & video from streams
        '-map', '0:a',
        '-map', '1:v',
        // Keep encoding
        '-c:v', 'copy',
        // Define output file
        `${title}.mkv`,
      ], {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit', 'inherit', 'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe', 'pipe', 'pipe',
        ],
      });
      ffmpegProcess.on('close', () => {
        console.log('done');
        // Cleanup
        process.stdout.write('\n\n\n\n');
        clearInterval(progressbarHandle);
      });
      
      // Link streams
      // FFmpeg creates the transformer streams and we just have to insert / read data
      ffmpegProcess.stdio[3].on('data', chunk => {
        // Start the progress bar
        if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
        // Parse the param=value list returned by ffmpeg
        const lines = chunk.toString().trim().split('\n');
        const args = {};
        for (const l of lines) {
          const [key, value] = l.split('=');
          args[key.trim()] = value.trim();
        }
        tracker.merged = args;
      });
      audio.pipe(ffmpegProcess.stdio[4]);
      video.pipe(ffmpegProcess.stdio[5]);}
    
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
        console.log('│               ❌ ENTRY ERROR: INVALID YOUTUBE MEDIA URL! ❌               │');        
        console.log('│                                                                           |');
        console.log('│   Please make sure you entered a valid YouTube media URL and try again.   │');
        console.log('│                                                                           |');
        console.log('╰───────────────────────────────────────────────────────────────────────────╯');
      }
     link = phase1(link);
  function validate(link, verify){
  if(ytdl.validateURL(link)){ verify = 1; sleep(700); lobby()}
    else verify = 0;
  return verify
  }
  verify = validate(link, verify);

  }while(verify !== 1)

  do{
    if(!fileformat) sleep(700); lobby();
    if(fileformat && fileformat !== '.mp3' && fileformat !== 'mp3' && fileformat !== '1' && fileformat !== '.mp4' && fileformat !== 'mp4' && fileformat !== 2){
      sleep(700);
      lobby();
      console.log('╭───────────────────────────────────────────────────────────────────────────╮');
      console.log('│                                                                           |');
      console.log('│              ❌ PROMPT ERROR: INVALID FILE FORMAT VALUE! ❌               │');        
      console.log('│                                                                           |');
      console.log('│                   Please enter a correct format value                     │');
      console.log('│           (Possible values : .mp3, .mp4, .mkv (Greatest only))            |');
      console.log('╰───────────────────────────────────────────────────────────────────────────╯');
    }
  console.log('─────────────────────────────────────────────────────────────────────────────────╮');  
  console.log('   Please choose the file format in which you want the file to be saved          │');
  console.log('─────────────────────────────────────────────────────────────────────────────────╯');
  var fileformat = prompt(':> '); console.log('\n')
  }while( fileformat !== '.mp3' && fileformat !== 'mp3' && fileformat !== '1' && fileformat !== '.mp4' && fileformat !== 'mp4' && fileformat !== '2' && fileformat !== 'mkv' && fileformat !== '.mkv')
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
      console.log('│                   (Possibilities: low, high, Greatest)                    |');
      console.log('╰───────────────────────────────────────────────────────────────────────────╯');
  }
  console.log('─────────────────────────────────────────────────────────────────────────────────╮');  
  console.log('     Please insert the quality of which you want the file to be saved            │');
  console.log('─────────────────────────────────────────────────────────────────────────────────╯');
  var quality = prompt(':> '); console.log('\n')
  qualityver = 0;
}while(quality !== 'low' && quality !== 'lowest' && quality !== 'high' && quality !== 'highest' && quality !== 'Greatest')
lobby();
  var choice;
  if(fileformat === 'mkv'){fileformat = '.mkv'}
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
  

  function confirm(link, fileformat, quality, path){
  console.log(`CHOOSEN PARAMETERS:\n\n (LINK: ${link});                        (FILE FORMAT: ${fileformat});\n\n (QUALITY: ${quality});                                                     (DIRECTORY: ${path})\n\n`)
      var videotitle;
      sleep(3000);}

      var pathv = 'C:/Users/nicke/OneDrive/Documents/OverPrompt/Output/';
      
      function verifypath(pathv){
        const directoryPath = path.resolve(pathv);
        fs.open(directoryPath, 'w', function(err){if(err) throw err})
        return directoryPath
              }
        
              function titleressourcer(title){
                for (let i = 0; i < title.length; i++) {
                  if (title[i] === '/' || title[i] === '?' || title[i] === '\\' || title[i] === '"' || title[i] === '*' || title[i] === '>' || title[i] === '<' || title[i] === '|' || title[i] === ':') {
                    title = title.substring(0, i) + '_' + title.substring(i + 1);
                  }
                }
                return title
              }
       function speedlistener(speed, value){
                    value = 'Mb/s';
                    if(speed > 10){
                      speed /= 10;
                      value = 'Gb/s';
                    }
                    else if(speed < 1){
                      speed *= 10;
                      value = 'Mb/s';
                      if(speed < 1){
                        speed *= 10;
                        value = 'Kb/s';
                        if(speed < 1){
                          speed *= 10;
                          value = 'Bytes/s';
                        }
                      }
                    }
                    return [speed, value]
        }
        function ytdlapi(link, pathv, format, quality){
          pathv = verifypath(pathv)
          confirm(link, format, quality, pathv);
          var video;
          function saveToFile(url, pathv){
            lobby()
            return new Promise((resolve) => {
              try{video = ytdl(url, {quality: quality, filter: choice});}catch(error){

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
                      speedynamic = (downloadedBytes / differencetime/1024); var value = 'Mb/s';
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
                    console.log(bytesd)
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
                    var value = 'Gb/s'
                    speed = bytesd / timeTaken / 1024 / 1024; // in MiB/s
                    speedout = speedlistener(speed, value); speed = speedout[0]; value = speedout[1];
                    
                    // clear progress bar
                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    
                    // print download summary
                    console.log(`\nDownloaded ${videoInfo.title} in ${timeTaken.toFixed(2)} ${unit} (avg speed: ${speed.toFixed(2)} ${value})\n`);
                    resolve();
                });
            });
        }
        
          
        startTime = Date.now();
    const savePromise = saveToFile(link, pathv);
    
    savePromise.then(() => {
        console.log('Done!');
    }).catch((error) => {
        console.error('Error:', error.message);
    });
}

          ytdl.getInfo(link)
          .then(vinfor => {
            vinfor = titleressourcer(vinfor.videoDetails.title);
            if(fileformat === '.mkv' && quality === 'Greatest'){
              greatest(link, vinfor);
            }
            else{
            pathv += vinfor + fileformat;
            console.log(vinfor);
            ytdlapi(link, pathv, fileformat, quality);
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