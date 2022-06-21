const UserController = require('./controllers/UserController');

//Rotas das requisições HTTP
module.exports = [
  {
    //Principais informações sobre uma requisicao
    endpoint: '/users',
    method: 'GET',
    //Função a ser executada para dar a resposta
    handler: UserController.listUsers,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUserById,
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: UserController.createUser,
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: UserController.updateUser,
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: UserController.deleteUser,
  },
]