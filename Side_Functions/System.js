const fs = require('fs')
const ytpl = require('ytpl')
const {Path} = require('../Downloader');

module.exports = {
  sys: async function sys(plink, warn){
    console.log('╭───────────────────────────────────────────────────────────────────────────╮');
    console.log('│                                                                           |');
    console.log('│                                                                           │');
    console.log('│                                                                           |');
    console.log('│    Processing the compilation of the provided YouTube playlist link...    │');
    console.log('│                                                                           |');
    console.log('╰───────────────────────────────────────────────────────────────────────────╯');

    var dirname = Path();
    var filePath = dirname + '/playlist.json';

    const pvinfor = await ytpl(plink)
      //console.log(pvinfor.title);

      var jsontemp =  fs.readFileSync(filePath)
      var object = JSON.parse(jsontemp)
      
      object = {
        "index": {"0": {
          "title": "temp1",
          "url": "temp2"
        }},
        "entities": pvinfor.estimatedItemCount,
        "pname": pvinfor.title
        
      }

      for(let i = 0; i<pvinfor.estimatedItemCount; i++){
        try{
          console.log(i, pvinfor.items[i].title)
          if(!object.index[i]){
            object.index[i] = {
              "title": pvinfor.items[i].title,
              "url": pvinfor.items[i].url
            }
          }
          else{
            object.index[i] = {
              "title": pvinfor.items[i].title,
              "url": pvinfor.items[i].url
            }
          }
        }catch(e){
          console.log(i)
        }
      }

      fs.writeFileSync(filePath, JSON.stringify(object, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File created successfully');
        }
      });
//console.log(pvinfor)
   
  }
}