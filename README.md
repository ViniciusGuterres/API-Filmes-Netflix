# API-Filmes-Netflix

1°) Baixar postgres

2°) Criar uma base de dados com os seguitnes parâmetros:
    user: 'postgres',
    host: 'localhost',
    database: 'faculdade',
    password: 'admin',
    port: 5432
    
3°) Criar a seguinte tabela:
`
  create table Movies_VG (
	id serial primary key,
	name varchar not null,
	is_on_nextflix boolean not null,
	imdb_score int,
	director varchar NOT NULL,
	genre varchar NOT NULL
  );
 
  
4°) No terminal de comando digitar o seguinte comando: `npm install`

5°) Para levantar o servidor, digite o seguinte comando no terminal: nodemon server.js

6°) Fazer as chamadas da api para as seguintes rotas:

	get: http://localhost:3000/getMovies - para pegar a lista de filmes
	
	post: http://localhost:3000/createMovie com o body no formato a seguir:
	{
	    "name": "la la land",
	    "is_on_nextflix": true,
	    "imdb_score": 8,
	    "director": "james cameron",
	    "genre": "musical"
	}
	
	delete: http://localhost:3000/deleteMovie/3 - com o id do filme a ser excluído
	
	put: http://localhost:3000/updateMovie/3 - com o id do filme a ser atualizado e body no formato a seguir:
	{
	    "name": "la la land",
	    "is_on_nextflix": true,
	    "imdb_score": 8,
	    "director": "james cameron",
	    "genre": "musical"
	}
