const fs = require('fs').promises;

// ------Declaração de Variáveis Globais-------
// Variável onde 
const numeroProcuradoParaPredicao = 7;

let somaValoresNegativos = 0;

// ---Funcionalidades----
async function lerFileiraDeDados() {
    try {
        const data = await fs.readFile('dados.csv', 'utf8');
        const arrayDados = data.split('\r\n').filter(item => item); // Filtrar itens vazios do array
        return arrayDados;
    } catch (err) {
        console.error("O arquivo não foi encontrado:", err);
        throw err; // Propagar o erro para o chamador
    }
}

async function encontrarPosicoesEProcessar() {
    try {
        const valorProcurado = numeroProcuradoParaPredicao;
        const listaDeDados = await lerFileiraDeDados();
        const posicoesDoValorProcurado = [];

        listaDeDados.forEach((valor, index) => {
            if (parseInt(valor) === valorProcurado) {
                posicoesDoValorProcurado.push(index + 1);
            }
        });

        const diferencasPosicoes = calcularDiferencas(posicoesDoValorProcurado);
        imprimirResultadoFinal(diferencasPosicoes, posicoesDoValorProcurado, listaDeDados.length);
    } catch (err) {
        console.error("Error:", err);
    }
}

function calcularDiferencas(posicoesDoValorProcurado) {
    const diferencasPosicoes = [];

    for (let i = 0; i < posicoesDoValorProcurado.length - 1; i++) {
        const atual = posicoesDoValorProcurado[i];
        const posterior = posicoesDoValorProcurado[i + 1];
        diferencasPosicoes.push(Math.abs(posterior - atual));

        if (posterior < atual) {
            somaValoresNegativos += (atual - posterior);
            console.log("==> " + (atual - posterior));
        }
    }

    return diferencasPosicoes;
}

let somatorioPosicoesGlobais = 0;

function imprimirResultadoFinal(diferencasPosicoes, posicoesDoValorProcurado, tamanhoDoRange) {
    somatorioPosicoesGlobais += diferencasPosicoes[diferencasPosicoes.length - 1];

    console.log("-------IMPRIMINDO RESULTADO-------");
    console.log("Valor Procurado => " + numeroProcuradoParaPredicao);
    console.log("Última Posição do Valor Procurado na TimeLine => " + posicoesDoValorProcurado[posicoesDoValorProcurado.length - 1]);
    console.log("Tamanho do Range da TimeLine => " + tamanhoDoRange);
    console.log("Valores Negativos Encontrados => " + somaValoresNegativos);

    const resultado = posicoesDoValorProcurado[posicoesDoValorProcurado.length - 1]
                    + somatorioPosicoesGlobais
                    - somaValoresNegativos;

    console.log("Resultado Encontrado da Predição => " + resultado);
}

// Início do processamento
encontrarPosicoesEProcessar();
