const HarvesterWorker = require('Classe.Screep.HarvesterWorker')

class HarvesterManager {
    constructor(){
        this.TypeWorker = 'Harvester'
        this.harvesters = [];
    }

    createWorker(){
        let worker = new HarvesterWorker(this.TypeWorker, Game.time, [WORK, CARRY, MOVE], 'harvester')
        let result = worker.create();

        if(result == 0){
            worker.saveState();
            this.harvesters.push(worker)
        }
    }

    selectEnergySource(creep){
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        return source ? source.id : source;
    }

    selectEnergyDestination(creep){
        const target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>
                (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                })[0]
        return target ? target.id : target;
    }

    assignEnergyRoute(harvester){
        let creep = Game.creeps[harvester.name];
        let source = this.selectEnergySource(creep);
        let destination = this.selectEnergyDestination(creep);

        if(source && destination){
            harvester.setEnergyRoute(source, destination);
        }
    }

    run(){
        this.harvesters = this.harvesters.filter(harvester => {
            let isAlive = harvester.isAlive();

            if (!isAlive){
                harvester.cleanupMemory();
            } else {
                if(!harvester.isOnRoute()){
                    this.assignEnergyRoute(harvester);
                }
                harvester.processEnergyRoute()
                harvester.saveState();
            }
            return isAlive;
        })
    }

    countWorkers(){
        return this.harvesters.length
    }

    recoverAll(){
        for(let name in Memory.creeps){
            let harvester = new HarvesterWorker();
            let state = Memory.creeps[name]["state"]

            harvester.recover(state)
            this.harvesters.push(harvester)
        }
    }
}

module.exports = HarvesterManager;
