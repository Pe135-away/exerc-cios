const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, resolve);
    });
}


function ehNumero(valor) {
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}


function exibirMatriz(matriz) {
    console.log('\n📊 MATRIZ 3x3:');
    console.log('='.repeat(30));
    for (let i = 0; i < 3; i++) {
        let linha = '| ';
        for (let j = 0; j < 3; j++) {
            linha += matriz[i][j] + ' | ';
        }
        console.log(linha);
    }
    console.log('='.repeat(30));
}

function somatorioLinha1(matriz) {
    let soma = 0;
    for (let j = 0; j < 3; j++) {
        soma += matriz[0][j];
    }
    return soma;
}


function multiplicacaoDiagonal(matriz) {
    let multiplicacao = 1;
    for (let i = 0; i < 3; i++) {
        multiplicacao *= matriz[i][i];
    }
    return multiplicacao;
}


function contarPares(matriz) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matriz[i][j] % 2 === 0) {
                count++;
            }
        }
    }
    return count;
}


async function main() {
    console.log('🎯 PROGRAMA DE MATRIZ 3x3');
    console.log('='.repeat(40));
    
    const matriz = [];
    

    console.log('\n📝 Preencha a matriz 3x3:');
    
    for (let i = 0; i < 3; i++) {
        const linha = [];
        
        for (let j = 0; j < 3; j++) {
            let valorValido = false;
            let valor;
            
            while (!valorValido) {
                valor = await perguntar(`Digite o valor para [${i+1},${j+1}]: `);
                
                if (ehNumero(valor)) {
                    valorValido = true;
                    linha.push(parseFloat(valor));
                } else {
                    console.log('❌ Por favor, digite um número válido!');
                }
            }
        }
        
        matriz.push(linha);
    }
    

    exibirMatriz(matriz);
    

    let executando = true;
    
    while (executando) {
        console.log('\n📋 MENU DE OPÇÕES:');
        console.log('1 - Somatório de todos os elementos da linha 1');
        console.log('2 - Multiplicação da diagonal da matriz');
        console.log('3 - Quantidade total de números pares');
        console.log('4 - Encerrar o programa');
        
        const opcao = await perguntar('\nEscolha uma opção (1-4): ');
        
        switch (opcao) {
            case '1':
                const soma = somatorioLinha1(matriz);
                console.log(`\n✅ Somatório da linha 1: ${soma}`);
                break;
                
            case '2':
                const multiplicacao = multiplicacaoDiagonal(matriz);
                console.log(`\n✅ Multiplicação da diagonal: ${multiplicacao}`);
                break;
                
            case '3':
                const pares = contarPares(matriz);
                console.log(`\n✅ Quantidade de números pares: ${pares}`);
                break;
                
            case '4':
                console.log('\n👋 Programa encerrado. Até mais!');
                executando = false;
                break;
                
            default:
                console.log('\n❌ Opção inválida! Digite um número de 1 a 4.');
                break;
        }
        
        if (executando) {
 
            exibirMatriz(matriz);
            

            const continuar = await perguntar('\nDeseja realizar outra operação? (s/n): ');
            if (continuar.toLowerCase() !== 's') {
                console.log('\n👋 Programa encerrado. Até mais!');
                executando = false;
            }
        }
    }
    
    rl.close();
}


rl.on('close', () => {
    console.log('\n✨ Programa finalizado.');
    process.exit(0);
});


main().catch(error => {
    console.error('❌ Erro no programa:', error);
    rl.close();
});