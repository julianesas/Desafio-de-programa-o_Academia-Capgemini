//Salvando as tags do index em variáveis para manipular o DOM
const inputNomeAnuncio = document.getElementById('nome_anuncio');
const inputNomeCliente = document.getElementById('nome_cliente');
const inputDataInicio = document.getElementById('data_inicio_anuncio');
const inputDataTermino = document.getElementById('data_termino_anuncio');
const inputInvestimento = document.getElementById('investimento_anuncio');
const btnCalcular = document.getElementById('btn_calcular');
const brnCadastrar = document.getElementById('btn_cadastrar');
const divResultadoCalculo = document.querySelector('.relatorio_calculado')
const tabelaAnuncio = document.getElementById('anuncios_cadastrados');
const formularioCadastro = document.getElementById('formulario_cadastro');
const formularioFiltro = document.getElementById('formulario_filtro');
const filtroDataInicial = document.getElementById('filtro_data_inicial');
const filtroDataFinal = document.getElementById('filtro_data_final');
const filtroNome = document.getElementById('filtroNome');

//Criando Novas variáveis
let nomeFiltro = ''; //Essa variável irá salvar o valor do nome pesquisado no Filtro 'Nome do Cliente'
let anuncio;  //Essa variável irá salvar um objeto contendo as informações do anúncio sempre que um novo anúncio for calculado
const arrayAnuncio = [] // Irá conter todos os anúncios cadastrados
let arrayAnuncioFiltrado = [] //irá conter um array de objetos contendo os anúncios filtrados de acordo com as informações inseridas no input
let arrayMapeado; //

btnCalcular.addEventListener('click', (e)=>{
    e.preventDefault();

    //Formatando data inicio para o formato pt-br
    const parseDataI = new Date(inputDataInicio.value);
    const setDataI = parseDataI.setDate(parseDataI.getDate() + 1).toLocaleString('pt-br');
    const dataInicioFormatada = parseDataI.toLocaleDateString('pt-br');

    //Formatando data final para o formato pt-br

    const parseDataF = new Date(inputDataTermino.value);
    const SetDataF = parseDataF.setDate(parseDataF.getDate() + 1).toLocaleString('pt-br');
    const dataFinalFormatada = parseDataF.toLocaleDateString('pt-br');

    //Calculará o valor total de dias do anúncio 
    let totalDias = calcularData(inputDataInicio.value, inputDataTermino.value);

    //Tratamento de erro para ser inseriada uma data fim do anúncio maior que a data de início
    if(totalDias <=0){
        alert('A data de término do anúncio deve ser maior que a data de início')
        inputDataTermino.value=''

    //Tratamento de erro para ser preenchido todos os campos to formulário
    }else if(inputNomeAnuncio.value==''||inputNomeCliente.value==''||inputDataInicio.value==''|| inputDataTermino.value==''||inputInvestimento.value==''){
        alert('Campo do formuário vazio! Por favor, preencha os campos obrigatórios(*)!')
    }else{
        let valorInvestDiario =  inputInvestimento.value;

        //valor total investido (investimento diário x dia)
        let totalInvestido = (valorInvestDiario*totalDias);

        //Valor Total investido formatado R$00,00
        let valorTotalFormatado = totalInvestido.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        //4 - 30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
        let pessoasVisualizam = parseInt(totalInvestido*30)

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
        }
        
        anuncio = {
                nome_cliente: inputNomeCliente.value,
                nome_anuncio: inputNomeAnuncio.value,
                data_inicio: dataInicioFormatada,
                data_final: dataFinalFormatada,
                valor_investido: valorTotalFormatado,
                pessoas_visualizam: maxPessoasVisualizam,
                pessoas_clicam: maxPessoasClicam,
                pessoas_compartilham: maxPessoasCompartilham
            }

        escreverCalculo ()   
    } 
})

//Retorna o número total de dias
function calcularData(dataI, dataF) {
    let dataInicial= converterData (dataI); 
    let dataFinal= converterData(dataF);

    /*Subtrai a segunda data em milisegundos pela primeira*/
    let diferenca = dataFinal.getTime() - dataInicial.getTime();
    
    /* Número total de dias. Divide o valor da diferença das datas em milisegundos pela quantidade de milisegundos em um dia e retorna o menor número inteiro */
    let totalDias = Math.ceil(diferenca/(1000*60*60*24))
    
    return totalDias;
}

//Irá escrever na página o relatório contendo as informações do anúncio calculado
function escreverCalculo (){
    divResultadoCalculo.classList.replace('template_none', 'template_calculo_anuncio')
    return divResultadoCalculo.innerHTML = `
    <div>
        <h1>Relatório</h1>
    </div>
    <div>
        <div class='relatorio'>
            <p><strong>Nome do Cliente:</strong> ${anuncio.nome_cliente}</p>
            <p><strong>Nome do Anúncio:</strong> ${anuncio.nome_anuncio}</p>
            <p><strong>Data início do Anúncio:</strong> ${anuncio.data_inicio}</p>
            <p><strong>Data final do Anúncio:</strong> ${anuncio.data_final}</p>
            <p><strong>Valor total investido:</strong> ${anuncio.valor_investido}</p>
            <p><strong>Estimativa do número máximo de pessoas que irão visualizar o anúncio:</strong> ${anuncio.pessoas_visualizam}</p>
            <p><strong>Estimativa do número máximo de pessoas que irão clicar no anúncio:</strong> ${anuncio.pessoas_clicam}</p>
            <p><strong>Estimativa do número máximo de pessoas que irão compartilhar o anúncio:</strong> ${anuncio.pessoas_compartilham}</p>
        </div>
        <input type="submit"  id="btn_cadastrar" class="cadastrar" value="Cadastrar Anúncio">
    </div> 
    
    `;
}
//Essa função irá ser chamada sempre que você clicar no botão 'casastrar' do Relatório calculado
document.querySelector('.relatorio_calculado').addEventListener('click', (e)=>{
    if(e.target.classList=='cadastrar'){
       divResultadoCalculo.classList.replace('template_calculo_anuncio','template_none')
           
           arrayAnuncio.push(anuncio)
           formularioCadastro.reset();
           divResultadoCalculo.innerHTML='';
           arrayAnuncioFiltrado = []
        nomeFiltro=''
           tabelaAnuncio.innerHTML = mapArray();


       }  
})


//Essa função será chamada toda vez que algo por escrito no input do filtro 'filtroNome' e irá filtrar um array com as informações do input
filtroNome.addEventListener('keyup',(e)=>{
    nomeFiltro = e.target.value.trim();
    console.log(nomeFiltro)
    let nomeFormatado = nomeFiltro.toLowerCase();
    let arrayFiltrado = arrayMapeado.filter(data=>{
        let dataFormatado = data.nome_cliente.toLowerCase()
        return dataFormatado.includes(nomeFormatado)
    }) 
    arrayAnuncioFiltrado = arrayFiltrado
    tabelaAnuncio.innerHTML = mapArray();
})  

//Essa função retorna o objeto data 
function converterData (DataDDMMYY){
    //Tratando as datas inseridas dos inputs
    if(DataDDMMYY.includes('-')){
        const dataSplit = DataDDMMYY.split("-");
        const novaData = new Date(parseInt(dataSplit[0], 10),
                   parseInt(dataSplit[1], 10)-1,
                   parseInt(dataSplit[2], 10));

        return novaData;
    } else{

        //tratando as datas do array de objetos de anúncios
        const dataSplit = DataDDMMYY.split("/");
        const novaData = new Date(parseInt(dataSplit[2], 10),
                   parseInt(dataSplit[1], 10) - 1,
                   parseInt(dataSplit[0], 10));
    
        return novaData;
    }
} 

//Essa função será chamada sempre que você inserir uma data e clicar no botão com nome 'Filtrar', 

document.getElementById('botao_filtrar').addEventListener('click', (e)=>{
    e.preventDefault()
    
    const dataMenor = converterData(filtroDataInicial.value);
    const dataMaior = converterData(filtroDataFinal.value);

    //tratamento de erro final seja menor que a data inicial  
    if(dataMenor >= dataMaior){
        alert('A data final do Filtro precisa ser maior que a tada Inicial')
    //tratamento de erro caso o campo do input de data esteja vazio 
    }else if(dataMenor=='Invalid Date' || dataMaior=='Invalid Date'){

        alert('Campo de filtrar data vazio!! Por favor, defina uma data!')
    }else{
        
        let arrayFiltrado = arrayMapeado.filter(result => {
            return converterData(result.data_inicio) >= dataMenor && converterData(result.data_final) <= dataMaior;
         })
         arrayAnuncioFiltrado= arrayFiltrado;

         //Tratamento de erro para caso não tenha anúncios cadastrados que esteja dentro do intervado de data pesquisado
         if(arrayAnuncioFiltrado.length===0){
             alert('Não há anúncios dentro do intervado de data filtrado!')
         }else{
            tabelaAnuncio.innerHTML = mapArray();
         }
         
    } 
})

//Função que limpa os campos de filtro
document.getElementById('botao_limpar').addEventListener('click',(e)=>{
    e.preventDefault()
    formularioFiltro.reset()
    arrayAnuncioFiltrado = []
    nomeFiltro=''
    tabelaAnuncio.innerHTML = mapArray();
})

//Função que mapeia o array e escreve na tabela
function mapArray(){
    
    arrayMapeado = !nomeFiltro && arrayAnuncioFiltrado.length==0? arrayAnuncio: arrayAnuncioFiltrado;
    
    let linhaTabela = arrayMapeado.map(anuncio=>{
        return `
            <tr >
            <td> ${anuncio.nome_cliente} </td>
            <td> ${anuncio.nome_anuncio}</td>
            <td> ${anuncio.data_inicio}</td>
            <td> ${anuncio.data_final}</td>
            <td> ${anuncio.valor_investido}</td>
            <td> ${anuncio.pessoas_visualizam}</td>
            <td> ${anuncio.pessoas_clicam}</td>
            <td> ${anuncio.pessoas_compartilham}</td>
            </tr>
            `
    }).join('')

    arrayAnuncioFiltrado=[]
    
    return linhaTabela
}
    
    












