const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const readline = require('readline');
const fs = require('fs')
const {lobby} = require('./Side_Functions/lobby')

module.exports = {
    ffmpex: async function ffmpex(link, title, path, TYPE, duration){
var counter = 0;
var timing
      //Summoning every variables
      var eformat
      var typeform
      let totaltime;
      var tracker;
      var video;
      var audio
      var ffmpegProcess
      var format
      
        if(TYPE === 'FLACACTIVATE') {typeform = 1; eformat = '.flac'; format = 'flac'}
      else if(TYPE === 'AACACTIVATE') {typeform = 2; eformat = '.aac'; format = 'aac'}
      else if(TYPE === 'WAVACTIVATE') {typeform = 3; eformat = '.wav'; format = 'wav'}
      else typeform = null
      
      try{
        if(typeform){
          tracker = {
            start: Date.now(),
            audio: { downloaded: 0, total: Infinity },
            merged: { encoded: 0, speed: '0x' },
            };
        }
      
        else{
    tracker = {
      start: Date.now(),
      audio: { downloaded: 0, total: Infinity },
      video: { downloaded: 0, total: Infinity },
      merged: { frame: 0, speed: '0x', fps: 0 },
    };}
    
    // Get audio and video streams
    audio = ytdl(link, { quality: 'highestaudio' })
      .on('progress', ( _, downloaded, total) => {
        if(typeform){
        total = (((192*duration)/8)*1000)
        downloaded -= (total - (((192*duration)/8)*1000))
        if(downloaded > total) total = (downloaded + 5)
        }
        tracker.audio = { downloaded, total };
      });
      
      if(!typeform){
      video = ytdl(link, { quality: 'highestvideo' })
      .on('progress', (_, downloaded, total) => {
        tracker.video = { downloaded, total };
      });}

    
    // Prepare the progress bar
    let progressbarHandle = null;
    const progressbarInterval = 1000;
    const showProgress = () => {
      readline.cursorTo(process.stdout, 0);
      const toMB = i => (i / 1024 / 1024).toFixed(2);
      var timer = ((Date.now() - tracker.start) / 1000 / 60)
      //var audiomax = toMB(tracker.audio.total)
      //var videomax = toMB(tracker.video.total)

      /*timing = setInterval(() => {
        if(timer.toFixed(2) >= 5.00 && videomax <= 15.00 || audiomax <= 15.00){
          counter ++
          console.log("Failed to download the track, OverPrompt will try again in a moment [TRY: ", counter, "]")
          base()
        }
      }, 1000)*/
      
      
    if(!typeform){
      process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
      process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);
      process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
      process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);
      process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
      process.stdout.write(`(at ${tracker.merged.speed}).${' '.repeat(10)}\n`);
    }
    else{
      process.stdout.write(``);
      process.stdout.write(``);
      process.stdout.write(`\n\rAudio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
      process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);
      process.stdout.write(`encoded | processing time ${tracker.merged.encoded.toFixed(2)} seconds `);
      process.stdout.write(`(at ${tracker.merged.speed}).${' '.repeat(10)}\n`);
    }
      
    
      process.stdout.write(`running for: ${timer.toFixed(2)} Minutes.`);
      readline.moveCursor(process.stdout, 0, -3);
      totaltime = Date.now() - tracker.start
      /*if(typeform){process.stdout.clearLine();
        console.log()
        process.stdout.cursorTo(0);}*/
        process.stdout.write('\r')
    };
    
    // Start the ffmpeg child process
    
    if(typeform && typeform !== 3){
      ffmpegProcess = cp.spawn(ffmpeg, [
        '-loglevel', '8', '-hide_banner','-progress', 'pipe:3', '-i', 'pipe:4', '-codec:a', 
        `${format}`, '-b:v', '10M', '-b:a', '192k', '-y', `${path}/${title}${eformat}`], 
        {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit', 'inherit', 'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe', 'pipe',
        ],
      });
    }
    else if(typeform ===3){
      ffmpegProcess = cp.spawn(ffmpeg, [
        '-loglevel', '8', '-hide_banner','-progress', 'pipe:3', '-i', 'pipe:4', '-acodec', 'pcm_s16le', '-minrate', '10k', '-maxrate', '10k', '-y', `${path}/${title}.wav`], 
        {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit', 'inherit', 'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe', 'pipe',
        ],
      });
    }
    else{
      path = './Output/MKV'
    ffmpegProcess = cp.spawn(ffmpeg, [
      '-loglevel', '8', '-hide_banner', '-progress', 'pipe:3', '-i', 'pipe:4', '-i', 'pipe:5', '-map', '0:a', '-map', '1:v', '-c:v', 'copy', '-b:v', '10M', '-y', `${path}/${title}.mkv`,
    ], {
      windowsHide: true,
      stdio: [
        /* Standard: stdin, stdout, stderr */
        'inherit', 'inherit', 'inherit',
        /* Custom: pipe:3, pipe:4, pipe:5 */
        'pipe', 'pipe', 'pipe',
      ],
    });}
    ffmpegProcess.on('close', () => {
      // Cleanup
      if(totaltime){
      clearInterval(progressbarHandle);
      
      if(typeform) process.stdout.write('\r\r\r');
      else process.stdout.write('\r\r\r\r\r\r\n');

      //console.log('\r\r\n')
      totaltime /= 1000
      var log = `\n \x1b[32mDownloaded ${title} in ${totaltime.toFixed(2)} seconds\x1b[0m \n`
      path = __dirname + '/Side_Functions/downlog.txt'
      try{
      fs.appendFileSync(path, log)
      }catch(e){
        console.log(e)
        }
        lobby()
      console.log('Please wait, OverPrompt is adding the final touch to the beauty of the media files')}
      else{console.error(`\n \x1b[32m Failed to Download ${title}\x1b[0m \n`)}

      clearInterval(timing)
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
      var ratio = (tracker.audio.total)/duration
      var nowtime = (tracker.audio.downloaded)/ratio

      if(typeform){
        tracker.merged.encoded = nowtime
      }
    });
    audio.pipe(ffmpegProcess.stdio[4]);

    if(!typeform){  
    video.pipe(ffmpegProcess.stdio[5]);}
  
  }catch(e){
      console.log(e)
      console.log('Error occured, exiting...')
    }
      
  return totaltime}}