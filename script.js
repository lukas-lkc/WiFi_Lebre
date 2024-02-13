/**
 * 
 * next tasks: criar algorítimo para média com exclusão de outliers em seguida o algoritmo para apresentar a média dos resulados coletados: dw, up, ms
 * performance download results, 
 * notification to downloadResults complete if I can't improve performance dw,
 * to check why data frequencia is undefined and fix that, add option to check resultos for each frequence.
 * 
 * future tasks: input to recive user's API URL and Sheet URL.
 * 
 * Vídeo que cria a integração entre a aplicação e a planilha:
 * https://www.youtube.com/watch?v=w7SUjrKCdwE
 * SW Monkey https://dashboard.sheetmonkey.io/edit/nM1XjZZREJ1rZ6fQxGJphG
 * 
 * Vídeo para usar os dados da planilha: https://www.youtube.com/watch?v=bCw85WL5Iw8
 * Planilha criada para salvar os dados https://docs.google.com/spreadsheets/d/1kdlP6e9nW2DCtGS1dHRsQ9fFqv4g3F-6Vbiuy-SK6Ek/edit#gid=0
 * 
 * Config da API da planilha abaixo, tá dando erro. Qt devo trocar para CH
 * https://script.google.com/u/0/home/projects/1v2QxKW4R3MnbeCBqpLaAwHy31cRFsQwYKZwR5Lda6MKROScJoIjuxmrT/edit
 * Link onde deve aparecer os dados JSON
 * https://script.google.com/macros/s/AKfycbz1E7Pn6bgv9aVLyyAWLlMzITj3pnY8yZF54ZbX7KwYDcounwvJqjubZkXE9N3E-CJk/exec
 * 
 * Variáveis:
 * 
 * formVisible2 e formVisible5, armazenam o formCh1 e formCh40, respectivamente a partir dos seus IDs
 * 
 * selectedOption, armazena o valor do 2° elemento de seleção onde é possível escolher a frequência !!! deletei agora se chama frequencia
 * 
 * forms, armazena todos os formulários com classe 2.4GHz ou 5GHz
 * buttons, representa todos os botões com a classe .btnSalvar
 * form, recebe uma representação de um formulário de acordo com a função handleFormSubmit, o formSelector seleciona o ID do form
 * canal recebe o seu valor a partir do dataset.canal do form selecionado
 * canal recebe um valor int do h1 de cada form de canal
 * 
 * frequencia recebe o mesmo valor da variavel selectedOption !!!
 * 
 * downlod recebe o input do campo download de cada form
 * upload recebe o input do campo upload
 * ms recebe o input do campo ms
 * dadosParaEnviar recebe um objeto js com os seguintes valores: { frequencia, canal, download, upload, ms }
 * apiGSheet recebe a API criada no Monkey, e isso gera uma planilha no Google Sheet
 * formCh1 ao formCh11, recebem a representação de cada form dos canais da frequência 2.4GHz
 * formCh40 ao X, recebem a representação de cada form dos canais da frequência 5GHz
 * 
 * Funções:
 * 
 * addloading(), itera sobre todos os botões selecionados e adicione a imagem SVG e a animação da classe btnSalvarAnim a cada um
 * removerLoad(), itera sobre todos os botões selecionados e adiciona a palavra Salvar, removendo a imagem SVG e a animação a cada um
 * handleSubmit(), seleciona os dados do formulário que está sendo preenchido pelo user
 * handleFormSubmit(), responsável por capturar os valores dos formulários e adicionar no obj dadosParaEnviar, através da função handleSubmit(). encaminha informações importantes para a função enviarDadosParaPlanilha(). 
 * enviarDadosParaPlanilha(), recebe urlPlanilha, dadosParaEnviar, canal e envia para a API, responsável por criar a planilha através dos valores do obj dadosParaEnviar
 * 
 * Métodos JS utilizados:
 * preventDefault(), impede o comportamento padrão associado a um determinado evento.
 * getElementById(), cria uma referência de um elemento atrávés do seu id
 * addEventListener(), anexar um ouvinte de evento a um elemento HTML, que permite especificar uma ação para ser executada quando um evento acontecer nesse elemento
 * querySelectorAll(), cria uma referência a vários elementos que estejam em uma classe específica
 * 
 * 
 */

document.addEventListener('DOMContentLoaded', function () {


    const infoIniciais = document.getElementById('controladorForm');
    const formVisible2 = document.getElementById('formCh1');
    const formVisible5 = document.getElementById('formCh40');
    const divApresentaDados = document.getElementById('apresentarDados');
    const btnAddNovosDados = document.getElementById('btnAddNovosDados');
    const btnResultado = document.getElementById('btnResultado');
    const tabela = document.getElementById('tabela');
    
    document.getElementById('controladorForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que o formulário seja submetido normalmente
        // Obtém o valor da opção selecionada
        const frequencia = document.getElementById('select1').value;

        // Verifica o valor selecionado e aplica as mudanças apenas quando clicar em "Aplicar"
        if (frequencia === '2') {
            formVisible2.style.display = 'block';
            infoIniciais.style.display = 'none';
            const forms = document.querySelectorAll('.form5G');
            forms.forEach(form => {
                form.style.display = 'none';
            });
            // document.querySelector('.form5G').style.display = 'none';
        } else {
            formVisible5.style.display = 'block';
            infoIniciais.style.display = 'none';
            const forms = document.querySelectorAll('.form2G');
            forms.forEach(form => {
                form.style.display = 'none';
            });
            // document.querySelector('.form5G').style.display = 'block';
        }
    });

    //animação dos botões
    const buttons = document.querySelectorAll('.btnSalvar'); // Use querySelectorAll para selecionar todos os elementos com a classe .btnSalvar
    // Defina a função addloading
    function addloading() {

        // Itere sobre todos os botões selecionados e adicione a imagem SVG e a animação a cada um
        buttons.forEach(button => {
            button.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="btnSalvarAnim" viewBox="-3 -3 18 18">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" stroke-width="4" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" stroke-width="4" /></svg>`;
        });
    }

    function removerLoad() {
        // Itere sobre todos os botões selecionados e adicione a imagem SVG e a animação a cada um
        buttons.forEach(button => {
            button.innerHTML = 'Salvar';
        });
    }


    //pega os dados das variáveis e direciona para a planilha
    function handleFormSubmit(formSelector, urlPlanilha) {
        const form = document.querySelector(formSelector);
        const canal = form.dataset.canal;

        const handleSubmit = (event) => {
            event.preventDefault(); // impede o recarregamento da página
            console.log("Formulário submetido", form);

            addloading(buttons)
            const frequencia = parseInt(document.querySelector('#select1').value);
            const canal = parseInt(document.querySelector(`${formSelector} h1`).getAttribute('value'));
            const download = parseFloat(document.querySelector(`${formSelector} input[name=dw]`).value);
            const upload = parseFloat(document.querySelector(`${formSelector} input[name=up]`).value);
            const ms = parseInt(document.querySelector(`${formSelector} input[name=ms]`).value);

            const dadosParaEnviar = { frequencia, canal, download, upload, ms };
            console.log("Dados a serem enviados:", dadosParaEnviar);

            // Passa o número do canal como parâmetro adicional para a função enviarDadosParaPlanilha
            enviarDadosParaPlanilha(urlPlanilha, dadosParaEnviar, canal);
        };

        form.addEventListener('submit', handleSubmit);
    }

    const apiGSheet = 'https://api.sheetmonkey.io/form/nM1XjZZREJ1rZ6fQxGJphG';

    //2GHz
    handleFormSubmit('#formCh1', apiGSheet);
    handleFormSubmit('#formCh2', apiGSheet);
    handleFormSubmit('#formCh3', apiGSheet);
    handleFormSubmit('#formCh4', apiGSheet);
    handleFormSubmit('#formCh5', apiGSheet);
    handleFormSubmit('#formCh6', apiGSheet);
    handleFormSubmit('#formCh7', apiGSheet);
    handleFormSubmit('#formCh8', apiGSheet);
    handleFormSubmit('#formCh9', apiGSheet);
    handleFormSubmit('#formCh10', apiGSheet);
    handleFormSubmit('#formCh11', apiGSheet);

    //5GHz
    handleFormSubmit('#formCh40', apiGSheet);


    // envia os dados para a planilha
    function enviarDadosParaPlanilha(url, dados, canal) {
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados),
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Dados enviados com sucesso!`);
                } else {
                    console.error(`Erro ao enviar dados`);
                }
            })
            .catch(error => console.error('Erro:', error))
            .then(() => {
                const formCh1 = document.getElementById('formCh1');
                const formCh2 = document.getElementById('formCh2');
                const formCh3 = document.getElementById('formCh3');
                const formCh4 = document.getElementById('formCh4');
                const formCh5 = document.getElementById('formCh5');
                const formCh6 = document.getElementById('formCh6');
                const formCh7 = document.getElementById('formCh7');
                const formCh8 = document.getElementById('formCh8');
                const formCh9 = document.getElementById('formCh9');
                const formCh10 = document.getElementById('formCh10');
                const formCh11 = document.getElementById('formCh11');
                //5GHz
                const formCh40 = document.getElementById('formCh40');
                removerLoad()
                switch (canal) {
                    case 1:
                        formCh1.style.display = 'none';
                        formCh2.style.display = 'block';
                        break
                    case 2:
                        formCh2.style.display = 'none';
                        formCh3.style.display = 'block';
                        break
                    case 3:
                        formCh3.style.display = 'none';
                        formCh4.style.display = 'block';
                        break;
                    case 4:
                        formCh4.style.display = 'none';
                        formCh5.style.display = 'block';
                        break;
                    case 5:
                        formCh5.style.display = 'none';
                        formCh6.style.display = 'block';
                        break;
                    case 6:
                        formCh6.style.display = 'none';
                        formCh7.style.display = 'block';
                        break;
                    case 7:
                        formCh7.style.display = 'none';
                        formCh8.style.display = 'block';
                        break;
                    case 8:
                        formCh8.style.display = 'none';
                        formCh9.style.display = 'block';
                        break;
                    case 9:
                        formCh9.style.display = 'none';
                        formCh10.style.display = 'block';
                        break;
                    case 10:
                        formCh10.style.display = 'none';
                        formCh11.style.display = 'block';
                        break;
                    case 11:
                        formCh11.style.display = 'none';
                        if (btnAddNovosDados.style.display === "none") {
                            btnAddNovosDados.style.display === "block"
                        };
                        divApresentaDados.style.display = 'block';
                        break;

                    //5GHz
                    case 40:
                        formCh1.style.display = 'none';
                        formCh40.style.display = 'block';
                        break;
                }
            });
    }


    //baixar informações da planilha 
    // Função para buscar e processar os dados da planilha
    async function getDataForAllChannels() {
        btnAddNovosDados.style.display = "none";
        tabela.style.display = "block"
        addloading(buttonDw);
        try {
            const channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Defina aqui os canais disponíveis na sua planilha

            // Objeto para armazenar o canal com o maior número de downloads
            let maxDownloads = 0;
            let maxDownloadsCanal = null;
            let tableData = ''; // Variável para armazenar os dados da tabela

            // Itera por todos os canais
            for (const canal of channels) {
                // Faz a solicitação para o canal atual
                const response = await fetch(`https://script.google.com/macros/s/AKfycbzFPk-5MmPC191z0l7zNFlggftueA6S8wtZHofS7ay7p0ZpIzt5aiTBC0zrL_UdRrVg/exec?canal=${canal}`);
                const data = await response.json();

                // Verifica se há dados retornados para o canal atual
                if (data.retornoDaSaida && data.retornoDaSaida.length > 0) {
                    const canalData = data.retornoDaSaida[0]; // Obtém o objeto de dados real do canal atual

                    // Adiciona os dados do canal à variável de dados da tabela
                    tableData += `
                        <tr>
                            <td>${canalData.canal}</td>
                            <td>${canalData.download}</td>
                            <td>${canalData.upload}</td>
                            <td>${canalData.ms}</td>
                        </tr>`;

                    // Verifica se o valor de download atual é maior que o valor máximo encontrado até agora
                    if (canalData.download > maxDownloads) {
                        maxDownloads = canalData.download;
                        maxDownloadsCanal = canalData.canal;
                    }
                } else {
                    console.log(`Nenhum dado retornado para o canal ${canal}.`);

                    const paragraph = document.createElement('p');
                    paragraph.textContent = `
                        Nenhum dado retornado para o canal ${canal}.`;

                    // Adiciona o parágrafo à div com o ID textResultado
                    const textResultado2 = document.getElementById('textResultado2');
                    textResultado2.appendChild(paragraph);
                }
            }
            const tableBody = document.getElementById('tableData');
            tableBody.innerHTML = tableData;
            // Após iterar por todos os canais, exibe o canal com o maior número de downloads
            if (maxDownloadsCanal !== null) {
                console.log(`Canal ${maxDownloadsCanal} tem o download mais rápido: ${maxDownloads}`);

                const paragraph = document.createElement('p');
                paragraph.textContent = `
                    Canal ${maxDownloadsCanal} tem o download mais rápido: ${maxDownloads}`;

                // Adiciona o parágrafo à div com o ID textResultado
                const textResultado3 = document.getElementById('textResultado3');
                textResultado3.appendChild(paragraph);
            } else {
                console.log('Nenhum dado de download encontrado.');

                const paragraph = document.createElement('p');
                paragraph.textContent = `
                    Nenhum dado de download encontrado..`;

                // Adiciona o parágrafo à div com o ID textResultado
                const textResultado4 = document.getElementById('textResultado4');
                textResultado4.appendChild(paragraph);
            }

        } catch (error) {
            console.error('Ocorreu um erro:', error);

            const paragraph = document.createElement('p');
            paragraph.textContent = `
                Ocorreu um erro:', ${error}`;

            // Adiciona o parágrafo à div com o ID textResultado
            const textResultado5 = document.getElementById('textResultado5');
            textResultado5.appendChild(paragraph);
        } finally {
            btnResultado.style.display = "none";
            removerLoad(); // Remove a animação de loading, independentemente do resultado da solicitação
        }
    }

    const buttonDw = document.querySelector('.btnResultado');
    buttonDw.addEventListener('click', getDataForAllChannels);


});