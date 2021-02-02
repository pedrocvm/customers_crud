<p align="center">
	<img alt="Triyo " style='width:80%' src="https://i.imgur.com/V1K41j1.png">
</p>

<p align="center">
  <a href="https://github.com/pedrocvm">
    <img align="center" alt="Feito por Pedro Matos" src="https://img.shields.io/badge/feito%20por Pedro Matos-%237519C1?style=for-the-badge">
  </a>
<p>

<p align="center">
 <a href="#movie_camera-demonstração">Demonstração</a> •
 <a href="#computer-sobre">Sobre</a> •
 <a href="#memo-roteiro">Roteiro</a> •
 <a href="#triangular_ruler-status-do-projeto">Status</a> •
 <a href="#dvd-executar-o-projeto">Executar</a> •
 <a href="#hammer-tecnologias">Tecnologias</a> •
 <a href="#boy-autor">Autor</a> •
 <a href="#page_facing_up-licença">Licença</a>
</p>

---
### :movie_camera: **Demonstração**
<h4 align="center" style="font-size: 16px; font-weight: 600">Página de Cadastro</h4>
<p align="center">
	<kbd>
		<img width="650" style="border-radius: 5px" alt="Demonstração da Aplicação - Página de Cadastro" src="https://i.imgur.com/QCqcOEF.png">
	</kbd>
</p>

<h4 align="center" style="font-size: 16px; font-weight: 600">Lista de Clientes</h4>
<p align="center">
	<kbd>
		<img width="650" style="border-radius: 5px" alt="Demonstração da Aplicação - Lista de Clientes" src="https://i.imgur.com/89LUMEK.png">
	</kbd>
</p>

<h4 align="center" style="font-size: 16px; font-weight: 600">Lista de Dependentes</h4>
<p align="center">
	<kbd>
		<img width="650" style="border-radius: 5px" alt="Demonstração da Aplicação - Lista de Dependentes" src="https://i.imgur.com/ERZHbnF.png">
	</kbd>
</p>

---

## :computer: Sobre

A Aplicação consiste em um CRUD de Clientes, que devem ser cadastrados com as seguintes propriedades:
- Nome
- CPF
- Endereço:
  - CEP
  - Logradouro
  - Número
  - Bairro
  - Cidade
  - Estado
- Contato:
  - Telefone
  - E-mail
- Dependentes: 
  - Nome,
  - CPF,
  - Idade,
  - Parentesco

Projeto desenvolvido para o Processo Seletivo da [TRIYO TECNOLOGIA](https://triyo.com.br/) e foi iniciado em 30/01/2021.
Foram exercitados tópicos como Múltiplos Ambientes (Produção, Desenvolvimento e Testes), Testes Unitários (Mocha/Chai), Glassmorphism e Vue-Particles.

Foi utilizado como apoio a API do ViaCEP para o preenchimento do endereço automaticamente após ser digitado o CEP.

---
### :memo: **Roteiro**

<details>
<summary>Clique para Visualizar</summary>

- [x] Criar Projeto Back-End utilizando NodeJS.
- [x] Criar CRUD de Clientes com os seguintes atributos (Nome, CPF, Endereço, Contato, Lista de Dependentes).
- [x] Criar CRUD de Dependentes com os seguintes atributos (Nome, CPF, Idade, Parentesco).
- [x] Criar vinculação entre Dependentes e Consumidores (Mantenedor x Dependente).
- [x] Criar Testes Unitários utilizando Mocha (NodeJS) para cada uma das operações (Create, Read, Update, Delete).
- [x] Criar Recursos REST para acesso aos Dados dos Clientes.
- [x] Criar projeto Front-End utilizando a tecnologia VueJS.
- [x] Criar Lista de Clientes e Lista de Dependentes.
- [x] Criar Tela de Cadastro de Clientes e de Dependentes. 
- [x] Disponibilizar os Dados para serem recuperados através dos Recursos REST definidos na Aplicação Back-End.
- [x] Disponibilizar projeto no Github.

</details>

---
### :triangular_ruler: **Status do Projeto**

<h4 align="center"> 
	👨‍🏫 Desafio_Triyo_Tecnologia v1.0 concluído !
</h4>

---
### :dvd: **Executar o Projeto**

```bash
# Clone este repositório
$ git clone https://github.com/pedrocvm/teste_triyo

# Acesse a pasta do projeto no terminal/cmd
$ cd teste_triyo

# Instale as Dependências
$ yarn

# Execute a Aplicação em modo de Desenvolvimento (o Servidor e o Client são inicializados ao mesmo tempo)
$ yarn dev:all

# Caso necessite de uma Base de Dados de exemplo
$ yarn generatedb

# Para executar a Aplicação em modo de Testes 
# deve ser usado um Terminal para cada Comando, pois, mesmo com Timeout, o Mocha inicializa antes do Servidor
$ yarn dev:test
$ yarn test
```

<p>⚠️ O servidor iniciará automaticamente na Porta 8080, caso não inicialize, acesse http://localhost:8080</p>
<p>⚠️ A documentação da API poderá ser consultada em http://localhost:3341/doc</p>

---
### :hammer: **Tecnologias**

As seguintes ferramentas foram utilizadas na construção do projeto:

### Back-End
- [NodeJS](https://nodejs.org/pt-br/)
- [Typescript](https://www.typescriptlang.org)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)

### Testes Unitários
- [Mocha](https://mochajs.org)
- [Chai](https://www.chaijs.com)

### Front-End
- [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML/HTML5)
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Archive/CSS3)
- [SASS](https://sass-lang.com)
- [VueJS](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)

---
### :boy: **Autor**

<div align="center">

<a href="https://github.com/pedrocvm">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60618486?s=460&u=661e1932902d4a8d7bf9c9f28038a68a4d5d0984&v=4" width="100px;" alt="Foto de Perfil Pedro Matos"/>
 <br />
 <sub><b>Pedro Matos</b></sub></a>


Feito com ❤️ por Pedro Matos 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Pedro_Matos-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pedrocvm/)](https://www.linkedin.com/in/pedrocvm/)
[![Github Badge](https://img.shields.io/badge/-pedrocvm-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/pedrocvm)](https://github.com/pedrocvm)
[![Gmail Badge](https://img.shields.io/badge/-pedrocvm3@gmail.com-FA5C5C?style=flat-square&logo=gmail&logoColor=white&link=mailto:pedrocvm3@gmail.com)](mailto:pedrocvm3@gmail.com)

</div>

---
### :page_facing_up: **Licença**

Copyright © 2021 [Pedro Matos](https://github.com/pedrocvm).<br />
Este projeto é licenciado pelo [MIT](./LICENSE).
