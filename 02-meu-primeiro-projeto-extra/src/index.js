const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block}  ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {

    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if ((block === "RETA")) {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if ((block === "CURVA")) {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }

        // Verifica se o bloco sorteado é "CONFRONTO"
        if (block === "CONFRONTO") {

            // Soma o resultado do dado com o atributo PODER do personagem 1
            let powerResult1 = diceResult1 + character1.PODER;

            // Soma o resultado do dado com o atributo PODER do personagem 2
            let powerResult2 = diceResult2 + character2.PODER;

            // Mostra no console que está acontecendo um confronto
            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥷`);

            // Mostra os detalhes da jogada do personagem 1
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);

            // Mostra os detalhes da jogada do personagem 2
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            // Se os dois resultados forem iguais, é empate
            if (powerResult1 === powerResult2) {
                console.log("Confronto empatado! Nenhum ponto foi marcado!");
                continue; // pula para a próxima rodada
            }

            // Define quem venceu e quem perdeu o confronto
            let vencedor, perdedor;
            if (powerResult1 > powerResult2) {
                vencedor = character1; // Mario venceu
                perdedor = character2; // Yoshi perdeu
            } else {
                vencedor = character2; // Yoshi venceu
                perdedor = character1; // Mario perdeu
            }

            // Escolhe aleatoriamente o tipo de ataque: CASCO (-1) ou BOMBA (-2)
            let ataque = Math.random() < 0.5 ? "CASCO" : "BOMBA";

            // Define a quantidade de pontos a serem perdidos com base no tipo de ataque
            let perda = ataque === "CASCO" ? 1 : 2;

            // Se o perdedor tiver pontos, subtrai (garante que nunca fique com valor negativo)
            if (perdedor.PONTOS > 0) {
                perdedor.PONTOS = Math.max(0, perdedor.PONTOS - perda);

                // Informa o tipo de ataque e quantos pontos foram perdidos
                console.log(`${vencedor.NOME} venceu o confronto! ${perdedor.NOME} foi atingido por um(a) ${ataque} e perdeu ${perda} ponto(s)!`);
            } else {
                // Se o perdedor não tiver pontos, não subtrai nada
                console.log(`${vencedor.NOME} venceu o confronto, mas ${perdedor.NOME} não tinha pontos para perder.`);
            }

            // 50% de chance do vencedor ganhar um ponto extra (TURBO)
            if (Math.random() < 0.5) {
                vencedor.PONTOS++; // adiciona 1 ponto
                console.log(`${vencedor.NOME} ganhou um TURBO! +1 ponto extra 🚀`);
            }

            // Linha visual separadora no console
            console.log("_________________________________________");

            // pula o restante da rodada (evita marcar ponto como na reta/curva)
            continue;
        }

        // verificando o vencedor

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill2) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("_________________________________________");

    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos!`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos!`);

    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n${character1.NOME} venceu a corrida! PARABÉNS 🏆`)
    else if (character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida! PARABÉNS 🏆`)
    else
        console.log("A corrida terminou em empate")


}

(async function main() {
    console.log(`\n 🏁 🚨 Corrida entre ${player1.NOME} e o ${player2.NOME} começando... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);

})()

