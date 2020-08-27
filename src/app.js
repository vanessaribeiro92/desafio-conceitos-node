const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// 2º step
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// 1º step
app.post("/repositories", (request, response) => {
  const { title , url , techs } = request.body;
  const repository = { 
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);
  return response.json(repository);
});

// 4º step
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  // se o repositório nao existe...
  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exists.'})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes,
  };

  repositories[findRepositoryIndex] = repository
  return response.json(repository);

});

// 3º step
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  // verifica se existe
  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1);
  } else { 
    // se nao existe...
    return response.status(400).json({ error: 'Repository does not exists'});
  }

  return response.status(204).send();
});


// 5º step
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

   // se o repositório nao existe...
   if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exists.'})
  }

  repositories[findRepositoryIndex].likes += 1;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
