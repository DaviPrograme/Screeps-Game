const Screep = require('Classe.Screep')

class HarvesterWorker extends Screep {
    constructor(type, spawnTime, body, role) {
        super(type, spawnTime, body, role);
        this.energySourceTarget = null;
        this.energyDestinationTarget = null;
    }

    setEnergyRoute(source, destination){
        this.energySourceTarget = source;
        this.energyDestinationTarget = destination;

        this.gatherEnergy();
    }

    gatherEnergy(){
        if (this.energySourceTarget){
            let creep = Game.creeps[this.name];

            if (creep.harvest(this.energySourceTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(this.energySourceTarget);
            } else if (creep.store.getFreeCapacity() == 0){
                this.energySourceTarget = null
            }
        }
    }

    deliverEnergy(){
        if (this.energyDestinationTarget){
            let creep = Game.creeps[this.name];
            if (creep.transfer(this.energyDestinationTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(this.energyDestinationTarget);
            } else {
                this.energyDestinationTarget = null
            }
        }
    }

    isOnRoute() {
        return  !!this.energySourceTarget || !!this.energyDestinationTarget;
    }

}

 module.exports = HarvesterWorker;