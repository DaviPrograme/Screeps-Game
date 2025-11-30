let SpawnResultMessages = {
    0: "Creep foi criado com sucesso",
    1: "Você não é dono do spawn",
    3: "Já existe um creep com esse nome",
    4: "O spawn está construindo outro creep",
    6: "Não há energia suficiente",
    10: "Parâmetros (nome ou body) inválidos",
    14: "O nível de Controlador é baixo para esse body"
};

class Screep {
    constructor(type, spawnTime, body, role) {
        this.name = type + spawnTime;
        this.spawnTime = spawnTime;
        this.role = role;
        this.body = body
    }

    create(){
        const result =  Math.abs(Game.spawns['Spawn1'].spawnCreep(this.body, this.name, {
            memory: { role: this.role }
        }))
        console.log(`${this.name}: ${SpawnResultMessages[result]}`)
        return result;
    }

    isAlive () {
        let isAlive = !!Game.creeps[this.name];
        if(!isAlive){
            console.log(`o screep ${this.name} morreu!`)
        }
        return isAlive;
    }

    cleanupMemory(){
        console.log(`o screep ${this.name} foi interrado!`)
        delete Memory.creeps[this.name];
    }
}

 module.exports = Screep;