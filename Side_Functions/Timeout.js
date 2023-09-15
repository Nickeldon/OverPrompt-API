module.exports = {
    Timeout: function run(gen, mili){
        const iter = gen();
        const end = Date.now() + mili;
        do {
            //console.log(iter)
          const {value,done} = iter.next();
          if(done) return value;
          if(end < Date.now()){
            console.log("Halted function, took longer than " + mili + " miliseconds");
            return null;
          }
        }while(true);
      }
}