console.log("START2")
const HarvesterManager = require('Classe.Screep.HarvesterManager')

let harvesterManager = new HarvesterManager()

module.exports.loop = function () {
    if(harvesterManager.countWorkers() == 0 &&  Object.keys(Memory.creeps).length > 0){
        harvesterManager.recoverAll();
    }
    
     if (harvesterManager.countWorkers() < 2) {
        harvesterManager.createWorker()
    }

    harvesterManager.run();
};