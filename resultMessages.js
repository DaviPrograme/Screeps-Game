const SpawnResultMessages = {
    [OK]: "Creep foi criado com sucesso",
    [ERR_NOT_OWNER]: "Você não é dono do spawn",
    [ERR_NAME_EXISTS]: "Já existe um creep com esse nome",
    [ERR_BUSY]: "O spawn está construindo outro creep",
    [ERR_NOT_ENOUGH_ENERGY]: "Não há energia suficiente",
    [ERR_INVALID_ARGS]: "Parâmetros (nome ou body) inválidos",
    [ERR_RCL_NOT_ENOUGH]: "O nível de Controlador é baixo para esse body"
};

const HarvestResultMessages = {
    [OK]: "Colheu energia com sucesso",
    [ERR_NOT_IN_RANGE]: "Está longe demais da fonte",
    [ERR_NOT_ENOUGH_RESOURCES]: "Fonte está esgotada",
    [ERR_INVALID_TARGET]: "O alvo não é uma fonte minerável",
    [ERR_NO_BODYPART]: "Faltam partes WORK",
    [ERR_NOT_OWNER]: "Fonte não é sua",
    [ERR_NOT_FOUND]: "O alvo não existe mais",
    [ERR_BUSY]: "Outra ação ativa no tick"
};

const MoveResultMessages = {
    [OK]: "O movimento foi iniciado com sucesso.",
    [ERR_TIRED]: "O creep não pode se mover porque seu fatigue > 0.",
    [ERR_NO_BODYPART]: "O creep não tem nenhuma parte MOVE.",
    [ERR_INVALID_TARGET]: "A posição/target passado não é válido.",
    [ERR_NOT_OWNER]: "O creep não pertence a você.",
    [ERR_BUSY]: "O creep já está executando outra tarefa ininterrupta." 
};

const TransferResultMessages = {
    [OK]: "Transferência realizada com sucesso",
    [ERR_NOT_OWNER]: "Você não é dono do creep ou do destino",
    [ERR_NO_BODYPART]: "Creep não possui partes CARRY suficientes",
    [ERR_NOT_ENOUGH_RESOURCES]: "Creep sem energia suficiente",
    [ERR_NOT_IN_RANGE]: "Alvo está fora do alcance",
    [ERR_INVALID_TARGET]: "Destino inválido para receber energia",
    [ERR_FULL]: "Destino está cheio",
    [ERR_BUSY]: "Creep está ocupado com outra ação",
    [ERR_NOT_FOUND]: "Destino não encontrado"
};

module.exports = {
    SpawnResultMessages,
    HarvestResultMessages,
    MoveResultMessages,
    TransferResultMessages
}