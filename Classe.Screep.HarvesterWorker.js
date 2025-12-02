const Screep = require("Classe.Screep");
const { HarvestResultMessages,  TransferResultMessages }  = require('resultMessages');

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
      let harvestCode = creep.harvest(sourceTarget)

      if (harvestCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(sourceTarget);
      } else if (harvestCode != OK) {
        console.log(`Creep: ${this.name} -> methodo: gatherEnergy -> Error: ${HarvestResultMessages[harvestCode]}`)
      } else if (creep.store.getFreeCapacity() == 0) {
        console.log(`Creep: ${this.name} -> methodo: gatherEnergy -> Transferencia de energia realizada com sucesso!!`)
        this.energySourceTargetID = null;
      }
    }
  }

  deliverEnergy() {
    if (this.energyDestinationTargetID) {
      let creep = Game.creeps[this.name];
      let destinationTarget = Game.getObjectById(this.energyDestinationTargetID)
      let transferCode = creep.transfer(destinationTarget, RESOURCE_ENERGY)

      if (transferCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(sourceTarget);
      } else if (transferCode != OK) {
        console.log(`Creep: ${this.name} -> methodo: deliverEnergy -> Error: ${TransferResultMessages[transferCode]}`)
      } else {
        console.log(`Creep: ${this.name} -> methodo: deliverEnergy -> Transferencia de energia realizada com sucesso!!`)
        this.energySourceTargetID = null;
      }
      
      creep.transfer(destinationTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
        ? creep.moveTo(destinationTarget)
        : (this.energyDestinationTargetID = null);
    }
  }

  processEnergyRoute(){
    this.energySourceTargetID ? this.gatherEnergy() : this.deliverEnergy();
  }

  isOnRoute() {
    return !!this.energySourceTargetID || !!this.energyDestinationTargetID;
  }

  saveState(){
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
