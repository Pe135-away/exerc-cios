const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function limparTela() {
  process.stdout.write("\x1Bc");
}s

let cine = Array.from({ length: 4 }, () => Array(4).fill("L"));


function exibirCinema() {
  console.log("Layout do Cinema (4x4):");
  for (let i = 0; i < 4; i++) {
    console.log(cine[i].join(" "));
  }
}


function iniciaCompra() {
  limparTela();
  exibirCinema();

  rl.question("\nDigite a linha da cadeira desejada (1 a 4): ", (linha) => {
    rl.question("Digite a coluna da cadeira desejada (1 a 4): ", (coluna) => {
      linha = parseInt(linha) - 1;
      coluna = parseInt(coluna) - 1;

      if (
        linha < 0 ||
        linha >= 4 ||
        coluna < 0 ||
        coluna >= 4
      ) {
        console.log("\n Posição inválida! Tente novamente.");
        return setTimeout(iniciaCompra, 2000);
      }

      if (cine[linha][coluna] === "O") {
        console.log("\n Essa cadeira já está ocupada.");
        return setTimeout(iniciaCompra, 2000);
      }


      cine[linha][coluna] = "O";

      console.log(
        `\n Compra confirmada! Cadeira escolhida: Linha ${linha + 1}, Coluna ${coluna + 1}`
      );

      setTimeout(iniciaCompra, 3000); 
    });
  });
}


iniciaCompra();