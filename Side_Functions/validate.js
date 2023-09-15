const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const {lobby} = require('./lobby')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
module.exports = {
    validate: function validate(link, verify){
        if(ytdl.validateURL(link))
            { verify = 1; sleep(700); lobby()}

        else if(ytpl.validateID(link))
            {console.log(ytpl.validateID(link)); 
                verify = 2;
                    sleep(700); lobby();
                        }

          else verify = 0;

        return verify
        }
}