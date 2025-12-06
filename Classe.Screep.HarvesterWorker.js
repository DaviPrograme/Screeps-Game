const Screep = require("Classe.Screep");
const { HarvestResultMessages,  TransferResultMessages }  = require('resultMessages');
const { buildActionResult }  = require('utils');

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
      let moveCode = null;

      if (harvestCode == ERR_NOT_IN_RANGE) {
            moveCode = creep.moveTo(sourceTarget);
      } else if (harvestCode != OK) {
        console.log(`Creep: ${this.name} -> methodo: gatherEnergy -> Error: ${HarvestResultMessages[harvestCode]}`)
      } else if (creep.store.getFreeCapacity() == 0) {
        console.log(`Creep: ${this.name} -> methodo: gatherEnergy -> Transferencia de energia realizada com sucesso!!`)
        this.energySourceTargetID = null;
      }
      return buildActionResult("harvest", harvestCode, moveCode);
    }
    return null;
  }

  deliverEnergy() {
    if (this.energyDestinationTargetID) {
      let creep = Game.creeps[this.name];
      let destinationTarget = Game.getObjectById(this.energyDestinationTargetID);
      let transferCode = creep.transfer(destinationTarget, RESOURCE_ENERGY);
      let moveCode = null;

      if (transferCode == ERR_NOT_IN_RANGE) {
            moveCode = creep.moveTo(destinationTarget);
      } else if (transferCode != OK) {
        console.log(`Creep: ${this.name} -> methodo: deliverEnergy -> Error: ${TransferResultMessages[transferCode]}`)
      } else {
        console.log(`Creep: ${this.name} -> methodo: deliverEnergy -> Transferencia de energia realizada com sucesso!!`)
        this.energyDestinationTargetID = null;
      }
      return buildActionResult("transfer", transferCode, moveCode);
    }
    return null;
  }

  processEnergyRoute(){
    return this.energySourceTargetID ? this.gatherEnergy() : this.deliverEnergy();
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
