const Screep = require("Classe.Screep");

class HarvesterWorker extends Screep {
  constructor(type, spawnTime, body, role) {
    super(type, spawnTime, body, role);
    this.energySourceTargetID = null;
    this.energyDestinationTargetID = null;
  }

  setEnergyRoute(source, destination) {
    this.energySourceTargetID = source;
    this.energyDestinationTargetID = destination;
  }

  gatherEnergy() {
    if (this.energySourceTargetID) {
      let creep = Game.creeps[this.name];
      let sourceTarget = Game.getObjectById(this.energySourceTargetID)

      if(this.name == "Harvester40463"){
        console.log(`creep: ${creep}\ncapacity: ${creep.harvest(this.energySourceTargetID)}\nsource: ${JSON.stringify(this.energySourceTargetID.id)}`)
      }

      if (creep.store.getFreeCapacity() != 0 && 
          creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
            console.log("teste")
            creep.moveTo(sourceTarget);
      } else if (creep.store.getFreeCapacity() == 0) {
        this.energySourceTargetID = null;
      }
    }
  }

  deliverEnergy() {
    if (this.energyDestinationTargetID) {
      let creep = Game.creeps[this.name];
      let destinationTarget = Game.getObjectById(this.energyDestinationTargetID)
      
      creep.transfer(destinationTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
        ? creep.moveTo(destinationTarget)
        : (this.energyDestinationTargetID = null);
    }
  }

  processEnergyRoute(){
    console.log(`${this.name} -> ${this.energySourceTargetID} ${this.energyDestinationTargetID}`)
    this.energySourceTargetID ? this.gatherEnergy() : this.deliverEnergy();
  }

  isOnRoute() {
    return !!this.energySourceTargetID || !!this.energyDestinationTargetID;
  }

  saveState(){
    // console.log(`JESUS33: ${JSON.stringify(this)}`)
    let creep = Game.creeps[this.name];
    creep.memory["state"] = this
   
  }

  recover(state){
    for (let key in state) {
      this[key] = state[key]
    }
  }
}

module.exports = HarvesterWorker;
