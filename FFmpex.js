const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const readline = require('readline');

module.exports = {
    ffmpex: async function ffmpex(link, title, path, TYPE){

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
            merged: { speed: '0x' },
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
    
      process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
      process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);
    if(!typeform){
      process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
      process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);
    }
      process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
      process.stdout.write(`(at ${tracker.merged.speed}).${' '.repeat(10)}\n`);
    
      process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
      readline.moveCursor(process.stdout, 0, -3);
      totaltime = Date.now() - tracker.start
    };
    
    // Start the ffmpeg child process
    
    if(typeform){
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
      
      if(typeform) process.stdout.write('\r\r\r\r\r\n');
      else process.stdout.write('\r\r\r\r\r\r\n');

      console.log('\r\r\n')
      totaltime /= 1000
      console.log(`\n \x1b[32mDownloaded ${title} in ${totaltime.toFixed(2)} seconds\x1b[0m \n`)}
      else{console.error(`\n \x1b[32m Failed to Download ${title}\x1b[0m \n`)}
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

    if(!typeform){
    video.pipe(ffmpegProcess.stdio[5]);}
  
  }catch(e){
      console.log(e)
      console.log('Error occured, exiting...')
    }
  return totaltime}}