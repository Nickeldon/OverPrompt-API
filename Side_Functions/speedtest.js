const speedTest = require('speedtest-net');
const fs = require('fs');

module.exports = {

    speedtester: async function* speedtester () {
        var warn = false
        const errorpath = __dirname + '/errorlogs.txt'
        const message = 'CONNECTION MEASURMENT FAULT----------------------------------------------------------------\n Connection measurment could not pursue. Verify your internet connection or your host integrity\n More informations on [./errorlogs.txt] \n ------------------------------------------------------------------------------------------'
        try{
        speedTest({ acceptLicense: true}).then(result => {
            yield
          if(!result){
            console.error("could not fork the client")
          }
          else{
        const pingSpeed = result.ping.latency;
        const infourl = result.result.url;
        var downloadSpeed = (result.download.bytes / 8000000).toFixed(2);
        var uploadSpeed = (result.upload.bytes / 8000000).toFixed(2);
        const bandwidth  = result.download.bandwidth;
               
        if(bandwidth < 15){
            warn = true
          const message = 'INTERNET --> ALERT: Bandidth is lower than 15 Mbps, slowdowns may occur while using the application'
          fs.appendFileSync(errorpath, message + '\n \n');
          //console.warn(message)
        } else if(downloadSpeed < 3){
            warn = true
          const message = 'INTERNET --> ALERT: Download speed value is lower than 20 MBps, slowdowns may occur while using the application' 
          fs.appendFileSync(errorpath, message + '\n \n');
          //console.warn(message)
        }
        //console.log(`Ping Speed: ${pingSpeed} ms\nDownload Speed: ${downloadSpeed} MBps\nUpload Speed: ${uploadSpeed} MBps`)
        //console.log('visit: ', infourl);
    
    }
      }).catch(error => {
        warn = true
        //console.error(message)
        fs.appendFileSync(errorpath, error + '\n \n');
      })
    } catch (error){
        warn = true
      //console.error(message)
      fs.appendFileSync(errorpath, error + '\n \n');
    }
    function warnerflag(warn){
        var stability
        var path = __dirname + '/connectionwarning.json'
          
      var jsontemp = fs.readFileSync(path)
      var object = JSON.parse(jsontemp)

      if(warn){stability = "slowed"}
      else{stability = "normal"}
      object = {
        "stability": stability
         }
         fs.writeFileSync(path, JSON.stringify(object, null, 2), (err) => {
            if(err){
                console.error(err)
            }
         })
    }
    warnerflag(warn)
    return warn
    }
}