
const fs = require('fs');
module.exports = { 
    lobby: function lobby(){
      console.clear();
      console.log('\x1b[34m  _|_|    _|      _|  _|_|_|_|  _|_|_|    _|_|_|    _|_|_|      _|_|    _|      _|  _|_|_|    _|_|_|_|_|\n_|    _|  _|      _|  _|        _|    _|  _|    _|  _|    _|  _|    _|  _|_|  _|_|  _|    _|      _|    \n_|    _|  _|      _|  _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|    _|  _|  _|  _|  _|_|_|        _|    \n_|    _|    _|  _|    _|        _|    _|  _|        _|    _|  _|    _|  _|      _|  _|            _|    \n  _|_|        _|      _|_|_|_|  _|    _|  _|        _|    _|    _|_|    _|      _|  _|            _|   \x1b[0m \n');console.log('\x1b[31m ════════════════════════════════════╣ YOUTUBE MEDIA DOWNLOADER ╠════════════════════════════════════ \x1b[0m');
      path = __dirname + '/connectionwarning.json'
      var json = fs.readFileSync(path)
      var object = JSON.parse(json)
      if(object.stability === "slowed"){
        console.log('\n╭─────────────────────────────────────────────────────────────────────────────────────╮')
        console.log('|    🌐 Service quality may be poorly affected due to the client\'s connection speed   │')
        console.log('╰─────────────────────────────────────────────────────────────────────────────────────╯');
        }
        console.log('\n\n')
    }
  }