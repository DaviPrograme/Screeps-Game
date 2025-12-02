const { SpawnResultMessages }  = require('resultMessages');

class Screep {
    constructor(type, spawnTime, body, role) {
        this.name = type + spawnTime;
        this.spawnTime = spawnTime;
        this.role = role;
        this.body = body
    }

    create(){
        const result =  Game.spawns['Spawn1'].spawnCreep(this.body, this.name, {
            memory: { role: this.role }
        })
        console.log(`${this.name}: ${SpawnResultMessages[result]}`)
        return result;
    }

    isAlive () {
        let isAlive = !!Game.creeps[this.name];
        if(!isAlive){
            console.log(`o creep ${this.name} morreu!`)
        }
        return isAlive;
    }

    cleanupMemory(){
        console.log(`o screep ${this.name} foi interrado!`)
        delete Memory.creeps[this.name];
    }
}

 module.exports = Screep;