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
    constructor(name, spawnTime, body, role) {
        this.name = name;
        this.spawnTime = spawnTime;
        this.role = role;
        this.body = body
    }

    create(){
        const newName = this.name + this.spawnTime;
        const result =  Math.abs(Game.spawns['Spawn1'].spawnCreep(this.body, newName, {
            memory: { role: this.role }
        }))
        console.log(`${newName}: ${SpawnResultMessages[result]}`)
        return result;
    }

    isAlive () {
        let alive = !!Game.creeps[this.name];
        if(!alive){
            console.log(`o screep ${this.name} morreu!`)
        }
        return alive;
    }
}

 module.exports = Screep;