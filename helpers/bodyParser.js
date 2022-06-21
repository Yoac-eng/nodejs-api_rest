//Função para receber dados do body de requisições PUT, POST e PATCH com eventListeners
function bodyParser(request, callback){
  let body = '';
   
    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      //Transformar string em objeto JSON
      body = JSON.parse(body);
      //Injetar no request a propriedade body com o body obtido
      request.body = body;
      callback();
    });
}

module.exports = bodyParser;