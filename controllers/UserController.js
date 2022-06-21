let users = require('../mocks/users');

module.exports = {
  listUsers(request, response){
    //Pegando o atributo order do objeto da query
    const { order } = request.query;

    //Irá mudar a ordenação do array caso os query params satisfaçam a condição
    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc'){
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    //Método de envio de respostas com statusCode e body 
    response.send(200, sortedUsers);
  },

  getUserById(request,response){
    const { id } = request.params;
    const user = users.find((user) => user.id === Number(id));

    //Caso o usuario nao exista
    if (!user){
      return response.send(200, { error: 'User not found'});
    }
    
    response.send(200, user);
  },

  createUser(request, response){
    const {body} = request;

    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    //Colocar no array o novo usuario
    users.push(newUser);
    response.send(200, newUser);
  },

  updateUser(request, response){
    //Pegar as informações da requisição
    let { id } = request.params;
    const { name } = request.body;

    id = Number(id);

    //Verificamos se o usuario existe
    const userExists = users.find((user) => user.id === id);

    if (!userExists){
      return response.send(400, { error: "User not Found"});
    }
    
    //Caso encontre o usuário desejado, um novo array com as novas informações sera retornado
    users = users.map((user) => {
      if (user.id === id){
        return {
          ...user,
          name,
        };
      };

      return user;
    });

    response.send(200, { id, name})
  },

  deleteUser (request,response){
    let { id } = request.params;    
    id = Number(id);
    
    const userExists = users.find((user) => user.id === id);
    
    if (!userExists){
      return response.send(400, { error: "User not Found"});
    }
     
    users = users.filter((user) => user.id !== id);
    response.send(200, { deleted: true});
  },
};