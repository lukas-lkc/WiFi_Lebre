const http = require('http');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Função para salvar os dados em uma planilha
// Função para salvar os dados em uma planilha
function salvarDadosEmPlanilha(formData) {
    const agora = new Date();
    const timestamp = agora.getTime(); // Obtém o timestamp atual em milissegundos

    const fileName = `dados_${timestamp}.xlsx`;

    let workbook;
    try {
        // Tenta carregar a planilha existente
        workbook = xlsx.readFile(fileName);
    } catch (error) {
        // Se a planilha não existir, cria uma nova
        workbook = xlsx.utils.book_new();
    }

    // Adiciona os dados do formulário à planilha
    const ws = xlsx.utils.json_to_sheet([formData]);
    xlsx.utils.book_append_sheet(workbook, ws, 'Dados');

    // Salva a planilha atualizada
    xlsx.writeFile(workbook, fileName);
}

////
const server = http.createServer((req, res) => {
    console.log('URL:', req.url);
    console.log('IP do cliente:', req.connection.remoteAddress); 

    if (req.method === 'GET') {
        let filePath = './index.html';
        
        if (req.url !== '/') {
            filePath = `.${req.url}`;
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Erro ao ler o arquivo ${req.url}:`, err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno do servidor');
            } else {
                let contentType = 'text/html';

                if (req.url.endsWith('.css')) {
                    contentType = 'text/css';
                }

                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const formData = JSON.parse(body);
            console.log('Dados do formulário:', formData);
            salvarDadosEmPlanilha(formData); // Salva os dados na planilha

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Dados do formulário recebidos com sucesso');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Servidor rodando em http://127.0.0.1:3000/');
});
