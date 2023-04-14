CREATE DATABASE pdv;

DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;

CREATE TABLE usuarios (
  	id serial primary key not null,
    nome text not null,
    email text not null unique,
    senha text not null
);

CREATE TABLE categorias (
  	id serial primary key not null,
    descricao text not null
);

INSERT INTO categorias
(descricao)
VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games')