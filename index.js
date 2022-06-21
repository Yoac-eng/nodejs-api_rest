const http = require('http');
const { URL } = require('url');

const bodyParser = require('./helpers/bodyParser');
const routes = require('./routes.js');

//Criação servidor
const server = http.createServer((request, response) => {
  //Instancia de objeto de dados da URL
  const parsedURL = new URL(`http://localhost:3000${request.url}`);

  //Print dos dados da requisição
  console.log(`Request Method: ${request.method} | Endpoint: ${parsedURL.pathname} | QueryParams: ${parsedURL.searchParams}`);

  //Desestruturando o endpoint colocando ele numa variavel
  let { pathname } = parsedURL;
  let id = null;

  //Divisão do endpoint
  const splitEndpoint = pathname.split('/').filter(Boolean);

  //Verificar sem tem ou não um parametro
  if(splitEndpoint.length > 1){
    //Um jeito de setar "na mão" simulando um endpoint com esse parametro por id
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  //Verificação da existência da rota
  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  )); 

  if (route){
    request.query = Object.fromEntries(parsedURL.searchParams);
    request.params = { id };

    //Encapsulamento das funções criadas anteriormente no controller para resposta de requisição
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    };

    //Verificar se o tipo de requisição terá ou nao um body para fazer o processo de recebimento do body e transformação pra objeto JSON
    if(['POST', 'PUT', 'PATCH'].includes(request.method)){
      bodyParser(request, () => route.handler(request, response));
    }
    else {
      route.handler(request, response);
    }
  } 
  else{
    //Mensagem caso endpoint não exista
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedURL.pathname}`);
  }
});

//Starta o servidor
server.listen(3000, () => console.log('The local server u just created is running on port localhost:3000 👺'));