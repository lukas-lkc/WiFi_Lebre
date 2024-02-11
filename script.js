/**
 * 
 * Vídeo que cria a integração entre a aplicação e a planilha:
 * https://www.youtube.com/watch?v=w7SUjrKCdwE
 * SW Monkey https://dashboard.sheetmonkey.io/edit/nM1XjZZREJ1rZ6fQxGJphG
 * 
 * Vídeo para usar os dados da planilha: https://www.youtube.com/watch?v=bCw85WL5Iw8
 * Planilha criada para salvar os dados https://docs.google.com/spreadsheets/d/1kdlP6e9nW2DCtGS1dHRsQ9fFqv4g3F-6Vbiuy-SK6Ek/edit#gid=0
 * Config da API da planilha abaixo, tá dando erro. Qt devo trocar para CH
 * https://script.google.com/u/0/home/projects/1v2QxKW4R3MnbeCBqpLaAwHy31cRFsQwYKZwR5Lda6MKROScJoIjuxmrT/edit
 * Link onde deve aparecer os dados JSON
 * https://script.google.com/macros/s/AKfycbz1E7Pn6bgv9aVLyyAWLlMzITj3pnY8yZF54ZbX7KwYDcounwvJqjubZkXE9N3E-CJk/exec
 * 
 */

document.addEventListener('DOMContentLoaded', function () {
    let canalSelecionado;

    const formVisible2 = document.getElementById('formCh1');
    const formVisible5 = document.getElementById('formCh40');
    document.getElementById('controladorForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que o formulário seja submetido normalmente
        // Obtém o valor da opção selecionada
        const selectedOption = document.getElementById('select1').value;

        // Verifica o valor selecionado e aplica as mudanças apenas quando clicar em "Aplicar"
        if (selectedOption === '2.4GHz') {
            formVisible2.style.display = 'block';
            
            const forms = document.querySelectorAll('.form5G');
            forms.forEach(form => {
                form.style.display = 'none';
            });
            // document.querySelector('.form5G').style.display = 'none';
        } else {
            formVisible5.style.display = 'block';

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

            addloading()
            const frequencia = document.querySelector('#select1').value;
            const canal = parseInt(document.querySelector(`${formSelector} h1`).getAttribute('value'));
            const download = document.querySelector(`${formSelector} input[name=dw]`).value;
            const upload = document.querySelector(`${formSelector} input[name=up]`).value;
            const ms = document.querySelector(`${formSelector} input[name=ms]`).value;

            const dadosParaEnviar = { frequencia, canal, download, upload, ms };
            console.log("Dados a serem enviados:", dadosParaEnviar);

            // Passa o número do canal como parâmetro adicional para a função enviarDadosParaPlanilha
            enviarDadosParaPlanilha(urlPlanilha, dadosParaEnviar, canal);
        };

        form.addEventListener('submit', handleSubmit);
    }

    const urlPlanilha = 'https://api.sheetmonkey.io/form/nM1XjZZREJ1rZ6fQxGJphG';

    //2GHz
    handleFormSubmit('#formCh1', urlPlanilha);
    handleFormSubmit('#formCh2', urlPlanilha);
    handleFormSubmit('#formCh3', urlPlanilha);
    handleFormSubmit('#formCh4', urlPlanilha);
    handleFormSubmit('#formCh5', urlPlanilha);
    handleFormSubmit('#formCh6', urlPlanilha);
    handleFormSubmit('#formCh7', urlPlanilha);
    handleFormSubmit('#formCh8', urlPlanilha);
    handleFormSubmit('#formCh9', urlPlanilha);
    handleFormSubmit('#formCh10', urlPlanilha);
    handleFormSubmit('#formCh11', urlPlanilha);

    //5GHz
    handleFormSubmit('#formCh40', urlPlanilha);


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
                        formCh1.style.display = 'block';
                        break;

                    //5GHz
                    case 40:
                        formCh1.style.display = 'none';
                        formCh40.style.display = 'block';
                        break;
                }
            });
    }

});