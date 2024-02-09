var t = 0;
var qt = 0;
var ch = 0;
var dw = 0;
var up = 0;
var ms = 0;
var hr = 0;
var dia = 0;
var local = 0;
var tool = 0;
var t = 0;

do {
    qt = prompt("Quantidade de testes por canal: ");
    qt = parseInt(qt); // Convertendo a entrada para um número inteiro

    // Verificando se a entrada é um número inteiro válido
    if (!isNaN(qt)) {
        console.log("Quantidade de testes por canal:", qt);
    } else {
        console.error("Entrada inválida. Por favor, insira um número inteiro.");
    }

    t = + 1;
} while (t < qt)