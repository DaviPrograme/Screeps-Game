console.log("davi monteiro")
const Harvester = require('Classe.Screep.Harvester.Worker')

module.exports.loop = function () {
    console.log("Teste de log", Object.values(Game.creeps));
    //console.log("Teste de log", Game.creeps["Harvester1985"]);
    // Limpa memória de creeps mortos
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Cria harvesters se tiver menos de 2
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    

    if (harvesters.length < 5) {
        let screep = new Harvester('Harvester', Game.time, [WORK, CARRY, MOVE], 'harvester')
        screep.create()
    }

    // Lógica dos creeps
    for (let name in Game.creeps) {
        const creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            if (creep.store.getFreeCapacity() > 0) {
                const source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            } else {
                const target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) =>
                        (structure.structureType == STRUCTURE_SPAWN ||
                         structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                })[0];

                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
};