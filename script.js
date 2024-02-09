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
    // Função para lidar com o envio do formulário


    /*
    // Faz uma requisição POST para o servidor com os dados do formulário
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Dados enviados com sucesso!');
                // Limpa os campos do formulário após o envio
                event.target.reset();
            } else {
                console.error('Erro ao enviar dados:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
        */

    /*
    // Obtém uma referência para o elemento select
    const selectElement = document.getElementById('select');

    // Adiciona um listener para o evento de mudança (change)
    selectElement.addEventListener('change', function () {
        // Obtém o valor da opção selecionada
        const selectedOption = selectElement.value;

        // Faça o que quiser com o valor selecionado
        console.log('Opção selecionada:', selectedOption);
        if (selectedOption === '2.4GHz') {
            document.getElementById('form2G').style.display = 'block';
            document.getElementById('form5G').style.display = 'none';
        } else {
            document.getElementById('form2G').style.display = 'none';
            document.getElementById('form5G').style.display = 'block';
        }
    });*/
    /*
    //função load
    const button = document.querySelector('button');
    const addloading = () => {
        button.innerHTML = '<img scr"./loading.png" class="loading">';
    }
    //função complete
    const removeloading = () => {
        button.innerHTML = 'Enviar';
    }
    */

    //função que limpa os formulários
    /*
    function limparFormulario(formularioId) {
        const form = document.getElementById(formularioId);
        const elementos = form.elements;

        for (let i = 0; i < elementos.length; i++) {
            const tipo = elementos[i].type;
            if (tipo === "text" || tipo === "number" || tipo === "textarea" || tipo === "password") {
                // Limpa os campos de texto, número, textarea e password
                elementos[i].value = "";
            } else if (tipo === "select-one" || tipo === "select-multiple") {
                // Reseta selects
                elementos[i].selectedIndex = -1;
            } else if (tipo === "checkbox" || tipo === "radio") {
                // Desmarca checkboxes e radios
                elementos[i].checked = false;
            }
        }
    }
    */

    //função pra subir os dados
    const handleSubmit = (event) => {
        event.preventDefault(); //impede o recarregamento da página

        const qt = document.querySelector('input[name=qt]').value;
        const local = document.querySelector('input[name=local]').value;
        const tool = document.querySelector('input[name=tool]').value; //só é usado input quando tem campo
        const select = document.querySelector('#select').value;

        //abaixo função que sobe os dados para a planilha
        fetch('https://api.sheetmonkey.io/form/nM1XjZZREJ1rZ6fQxGJphG', { //ao executar a função handleS q tá no botão vai ser feito um post nessa URL

            //abaixo temos o pacote que será enviado
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ qt, local, tool, select }), //aqui tem um obj js e está sendo convertido em string JSON p/ ser enviado no pacote
        })//.then(()=> removeload()).then(()=> limpaFormulario()); //habilitar isso quando tiver o load!!!!
    }

    document.querySelector('#controladorForm').addEventListener('submit', handleSubmit);
    //esse código está criando uma escuta em todo o form controladorForm e adicionando o evento submit que dispara a function handleSubmit

});