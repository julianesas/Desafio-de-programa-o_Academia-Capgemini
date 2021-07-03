# Gerenciador de Anúncios

Este projeto é referente a um desafio de programação realizado pela **Academia Capgemini**.  


## Instruções para baixar o repositório


1. Caso queira 'forkar' este repositório para o seu repositório remoto do github
   ```
   Clique em  "Fork"na [homepage](https://github.com/julianesas/Desafio-de-programacao_Academia-Capgemini) do repositório.


   Após clonar, caso tenha o git instalado na sua máquina, faça o seguinte comando:

   git clone [link-do-repositorio-clonado]

   ```


2. Você também pode clonar diretamente este repositório remoto para a sua máquina

   ```
   git clone https://github.com/julianesas/Desafio-de-programacao_Academia-Capgemini.git

   Também é possível baixar o arquivo em formato `.zip` clicando em "Clone" aqui na homepage

   ```

3. Para inicializar o script calculadora.js `Parte 1` utilize o Run code do seu VsCode

4. Para inicializar a `Parte 2` utilize a extensão que costuma utilizar no seu VsCode para visualização do index.html no Browser.

 ```
   Dica de extensão

   Baixe a extensão 'Live Server'

   E inicialize o projeto clicando com o mouse encima do index com o botão direito e selecione 'Open with Live server'

   ```

5. Estrutura das pastas

  ```
    ├──| Parte 1
    ├─────────| calculadora.js
    ├──| Parte 2
    ├─────────| css
    ├──────────────────| style.css
    ├─────────| html 
    ├──────────────────| index.html
    ├─────────| imagens
    ├─────────| js 
    ├──────────────────| calculadora.js
    ├──| README.md

   ```


## O problema

 
A agência Divulga Tudo precisa de um programa para gerenciar os seus anúncios online. O objetivo dos anúncios faz parte de uma campanha nas redes sociais. O sistema de gerenciamento permitirá a gestão do anúncio e o rastreio dos resultados da campanha.

Este programa será composto de duas partes:
1ª Parte – Uma calculadora de alcance de anúncio online.

2ª Parte - Um sistema de cadastro de anúncios.

---
 
#### [Parte 01:](https://github.com/julianesas/Desafio-de-programacao_Academia-Capgemini/tree/master/Parte%201)

Baseados em dados de análise de anúncios anteriores, a agência tem os seguintes dados:
1. a cada 100 pessoas que visualizam o anúncio 12 clicam nele.
2. cada 20 pessoas que clicam no anúncio 3 compartilham nas redes sociais.
3. cada compartilhamento nas redes sociais gera 40 novas visualizações.
4. 30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
5. o mesmo anúncio é compartilhado no máximo 4 vezes em sequência
(1ª pessoa -> compartilha -> 2ª pessoa -> compartilha - > 3ª pessoa -> compartilha -> 4ª pessoa)

Crie um script em sua linguagem de programação preferida que receba o valor investido em reais e retorne uma projeção aproximada da quantidade máxima de pessoas que visualizarão o mesmo anúncio (considerando o anúncio original + os compartilhamentos)


A partir dessas instruções foi criado um script na linguagem javaScript [calculadora.js.](https://github.com/julianesas/Desafio-de-programacao_Academia-Capgemini/blob/master/Parte%201/calculadora.js)

  - Foi criada uma função chamada calculadoraDeanuncios que irá receber o valor em reais.
  - Seguindo as instruções da Parte 1, a calculadoraDeanuncios irá retornar as seguintes dados:
    - Valor Investido em reais
    - Número de pessoas que visualizarão o anúncio original (não compartilhado)
    - Número máximo de pessoas que visualizarão o anúncio (compartilhado)
    - Número máximo de pessoas que clicarão no anúncio
    - Número máximo de pessoas que compartilharão o anúncio nas redes sociais
    - Número máximo de pessoas que visualizarão o anúncio (original+compartilhado)


---
#### [Parte 02](https://github.com/julianesas/Desafio-de-programacao_Academia-Capgemini/tree/master/Parte%202)

##### Instruções

1- Foi construído a parte visual da página utilizando a linguagem HTML5 e CSS3. 
2- Na página existe um menu de navegaçao com informações sobre o Desafio da Academia Capgemini e sobre a Autora.
3- A página conterá um formulário de cadastro de anúncios que irá receber os seguintes dados:

- nome do anúncio
- cliente
- data de início
- data de término
- investimento por dia

4- Após preencher os campos dos formulários clique no botão **Calcular Anúncio**.
Irá aparecer um relatório abaixo do formulário com os seguintes dados:
- Nome do cliente
- Nome do anúncio
- valor total investido
- Quantidade máxima de visualizações
- Quantidade máxima de cliques
- Quantidade máxima de compartilhamentos
  
5- Os dados de retornos serão obtidos por meio do script da página , construído conforme orientações da parte 01 deste desafio.

6- Clique no botão **Cadastrar anúncio** para poder salvar o anúncio da tabela na sessão **Anúncios cadastrados**.
 
7- Os relatórios poderão ser filtrados por intervalo de tempo(Data de inicio do anúncio e data final do anúncio) e pelo nome do cliente.

8- Para limpar os filtros, clique em **Limpar Filtro**





