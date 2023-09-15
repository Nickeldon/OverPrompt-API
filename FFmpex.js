const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const readline = require('readline');
const fs = require('fs')
const {lobby} = require('./Side_Functions/lobby')

module.exports = {
    ffmpex: async function ffmpex(link, title, path, AACENABLE){
      let totaltime;
      try{
      
    const tracker = {
      start: Date.now(),
      audio: { downloaded: 0, total: Infinity },
      video: { downloaded: 0, total: Infinity },
      merged: { frame: 0, speed: '0x', fps: 0 },
    };
    
    // Get audio and video streams
    const audio = ytdl(link, { quality: 'highestaudio' })
      .on('progress', ( _, downloaded, total) => {
        tracker.audio = { downloaded, total };
      });
      var video;
      if(!AACENABLE){
      video = ytdl(link, { quality: 'highestvideo' })
      .on('progress', (_, downloaded, total) => {
        tracker.video = { downloaded, total };
      });}
      var eformat
      //console.log(AACENABLE)
    if(AACENABLE) eformat = '.aac'
    else eformat = '.mkv'
    //console.log(eformat)
    //console.log(AACENABLE)
    // Prepare the progress bar
    let progressbarHandle = null;
    const progressbarInterval = 1000;
    const showProgress = () => {
      readline.cursorTo(process.stdout, 0);
      const toMB = i => (i / 1024 / 1024).toFixed(2);
    
      process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
      process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);
    if(!AACENABLE){
      process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
      process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);
    }
      process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
      process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);
    
      process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
      readline.moveCursor(process.stdout, 0, -3);
      totaltime = Date.now() - tracker.start
    };
    
    // Start the ffmpeg child process
    if(!AACENABLE){const map = ''}
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
    '-b:v', '10M', '-y', `${path}/${title}${eformat}`,
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
      // Cleanup
      clearInterval(progressbarHandle);
      process.stdout.write('\r\r\r\r\r\r\n');
      console.log('\r\r\n')
      console.log(`\n \x1b[32mDownloaded ${title} in ${totaltime.toFixed(2)} seconds\x1b[0m \n`)
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
    if(!AACENABLE){
    video.pipe(ffmpegProcess.stdio[5]);}}catch(e){
      console.log(e)
      console.log('Error occured, exiting...')
    }
  return totaltime}}