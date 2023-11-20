const fs = require('fs')

  module.exports = {
    integrity: function integrity() {
        var path = __dirname + '/connectionwarning.json';
    const jsontemp = fs.readFileSync(path)
    const object = JSON.parse(jsontemp)

        dns.resolve('www.google.com', function error(err) {
            console.log(err)
    if (err) {
       object.presence = "false"
    } else {
       object.presence = "true"
    }
    console.log(object)
  });
  fs.writeFileSync(path, JSON.stringify(object, null, 2), (err) => {
    if(err){
        console.error(err)
    }
 })
}}