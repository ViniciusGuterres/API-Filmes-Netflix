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
 
  
4°) No terminal de comando digitar o seguinte comando: npm install

5°) Para levantar o servidor, digite o seguinte comando no terminal: nodemon server.js
