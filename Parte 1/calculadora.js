/* Crie um script em sua linguagem de programação preferida que receba o valor investido em reais e 
retorne uma projeção aproximada da quantidade máxima de pessoas que visualizarão o mesmo anúncio 
considerando o anúncio original + os compartilhamentos)*/

/*Baseados em dados de análise de anúncios anteriores, a agência tem os seguintes dados:

1- a cada 100 pessoas que visualizam o anúncio 12 clicam nele.
2- a cada 20 pessoas que clicam no anúncio 3 compartilham nas redes sociais.
3 -cada compartilhamento nas redes sociais gera 40 novas visualizações.
4 -30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
5 - o mesmo anúncio é compartilhado no máximo 4 vezes em sequência

(1ª pessoa -> compartilha -> 2ª pessoa -> compartilha - > 3ª pessoa -> compartilha -> 4ª pessoa)*/



let resultadoDocalculo = calculadoraDeanuncios(100);


function calculadoraDeanuncios(investimento) {
  
    // Transformando o valor para o formato R$ 00,00 
  const valorTotalFormatado = investimento.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
});

    //4 - 30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
    let pessoasVisualizam = parseInt(investimento)*30

    let pessoas

    //A variável 'novasVisualizações' irá entrar no for com o valor inicial de 'pessoasVisualizam'
    //apenas por questão de calculo dentro do loop no primeiro momento quando i=0,
    //Após isso ela irá receber o valor real de novas Visualizações considerando o seguinte requisito:
    //3- cada compartilhamento nas redes sociais gera 40 novas visualizações.
    let novasVisualizacoes = pessoasVisualizam;

    //Receberá a estimativa da quantidade máxima de pessoas que Clicam
    let maxPessoasClicam= 0;

    //Receberá a estimativa da quantidade máxima de pessoas que compartilham
    let maxPessoasCompartilham = 0;

    //Receberá a estimativa da quantidade máxima de pessoas que que visualizam(pessoasVisualizam+novasVisualizações)
    let maxPessoasVisualizam = pessoasVisualizam;

    //Receberá a estimativa da quantidade máxima de pessoas que que visualizarão os compartilhamentos(anúncio compartilhado)
    let maxNovasVisualizações = 0;

    //5 - O mesmo anúncio é compartilhado no máximo 4 vezes em sequência i<4
    for(let i = 0; i<4; i++){

        //1- a cada 100 pessoas que visualizam o anúncio 12 clicam nele.
        let pessoasClicam= parseInt((novasVisualizacoes/100)*12)

        //2- a cada 20 pessoas que clicam no anúncio 3 compartilham nas redes sociais.
        let pessoasCompartilham = parseInt((pessoasClicam/20)*3)

        //3 -cada compartilhamento nas redes sociais gera 40 novas visualizações.
        novasVisualizacoes = parseInt(pessoasCompartilham*40)
        maxPessoasClicam+=pessoasClicam
        maxPessoasCompartilham+=pessoasCompartilham
        maxPessoasVisualizam+=novasVisualizacoes
        maxNovasVisualizações+=novasVisualizacoes
    }

  return {
    pessoasVisualizam,
    valorTotalFormatado,
    maxNovasVisualizações,
    maxPessoasVisualizam,
    maxPessoasClicam,
    maxPessoasCompartilham,
  };
}
console.log('<------------------RELATÓRIO----------------->\n');
console.log("Valor Investido:", resultadoDocalculo.valorTotalFormatado);
console.log("Número de pessoas que visualizarão o anúncio original (não compartilhado):", resultadoDocalculo.pessoasVisualizam);
console.log("Número máximo de pessoas que visualizarão o anúncio (compartilhado):", resultadoDocalculo.maxNovasVisualizações);
console.log("Número máximo de pessoas que clicarão no anúncio:", resultadoDocalculo.maxPessoasClicam);
console.log("Número máximo de pessoas que compartilharão o anúncio nas redes sociais:",resultadoDocalculo.maxPessoasCompartilham);
console.log("Número máximo de pessoas que visualizarão o anúncio (original+compartilhado):", resultadoDocalculo.maxPessoasVisualizam);
console.log('\n<------------------Fim Relatório----------------->\n');

//Valor do investimento Formatado R$ 00,00

console.assert(calculadoraDeanuncios(9.6).valorTotalFormatado === (9.6).toLocaleString("pt-BR", { style: "currency",currency: "BRL",}),"Valor informado não foi formatado corretamente");

// 4 -30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
console.assert(
    calculadoraDeanuncios(1.1).pessoasVisualizam === parseInt(1.9) * 30,
    "Número de pessoas que visualizam anúncio original incorreto"
  );

// 1 - a cada 100 pessoas que visualizam o anúncio 12 clicam nele.

console.assert((calculadoraDeanuncios(300).maxPessoasClicam)===((parseInt(((parseInt(300.9)*30)/100)*12))+(parseInt(((parseInt((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3)*40)/100)*12))+(parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12))+(parseInt((((parseInt((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12))),
"Número máximo de pessoas que clicarão no anúncio incorreto");
 //2- a cada 20 pessoas que clicam no anúncio 3 compartilham nas redes sociais.

 console.assert((calculadoraDeanuncios(300).maxPessoasCompartilham)===((parseInt((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))+(parseInt((parseInt(((parseInt((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3)*40)/100)*12)/20)*3))+(parseInt((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12)/20)*3))+(parseInt((parseInt(((parseInt((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12)/20)*3)*40)/100)*12)/20)*3))),
"Número máximo de pessoas que compartilharão o anúncio incorreto");

//3 -cada compartilhamento nas redes sociais gera 40 novas visualizações.

console.assert((calculadoraDeanuncios(300).maxNovasVisualizações)===((parseInt((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3)*40)+(parseInt((parseInt(((parseInt((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3)*40)/100)*12)/20)*3)*40)+(parseInt((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12)/20)*3)*40)+(parseInt((parseInt(((parseInt((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12)/20)*3)*40)/100)*12)/20)*3)*40)),
"Número máximo de Novas visualizações incorreto");

//Total de pessoas que visualizam o anuncio(compartilhado+original)

console.assert((calculadoraDeanuncios(300).maxPessoasVisualizam)===((parseInt((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3)*40)+(parseInt((parseInt(((parseInt((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3)*40)/100)*12)/20)*3)*40)+(parseInt((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12)/20)*3)*40)+(parseInt((parseInt(((parseInt((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(((parseInt(300.9)*30)/100)*12)/20)*3))*40)/100)*12)/20)*3))*40)/100)*12)/20)*3)*40)/100)*12)/20)*3)*40)+(parseInt(300.9)*30)),
"Número máximo de visualizações incorreto");








