# API-VISIONA


<h1 align="center">API 3º Semestre 2023 - Equipe Átomo</h1>

<p align="center">
  <a href ="#projeto">Projeto </a>  •
  <a href ="#proposta">Proposta </a>  • 
  <a href ="#prototipo">Protótipo </a>  • 
  <a href ="#cronograma-das-sprints">Cronograma das Sprints </a> •
  <a href ="#backlog-do-produto">Backlog do Produto </a>
  <br>
  <a href ="#backlog-das-sprints">Backlog das Sprints </a>  •
  <a href ="#burndown-das-sprints">Burndown das Sprints </a>  •
  <a href ="#tecnologias">Tecnologias</a>  •
  <a href ="#produto">Produto</a>  •
  <a href ="#modelo-de-dados-relacional">Modelo de Dados Relacional</a>  •
  <a href ="#equipe">Equipe</a> 
</p>

<br>

<span id="projeto">
  
## :clipboard: O Projeto

> **Status do Projeto: Em andamento**
- Nosso cliente, como usuário, quer que seja desenvolvido um sistema de gerenciamento de usuários, assim como um serviço de autenticação/autorização. Este serviço deve ser implementando utilizando tecnologia de microserviço, e usando recursos e ferramentas da GCP (Google Cloud Platform). Deve ser utilizado container, e implementando em esteira de CI/CD. O sistema deve seguir as boas práticas de desenvolvimento orientado a objetos como, SOLID e Clean Code, e Clean Architecture. Também deverão ser implementados os testes unitátios e de integração, para garantir a qualidade da entrega. A cobertura do código deve ser de pelo menos 80%, devendo ser validado pelo SONAR, ou outra ferramenta de análise. O sistema deve possuir uma interface para gerenciar os usuarios, pemitindo que sejam criados, visualizados, editados e removidos. Deve ainda permitir a atribuição de permissões para cada usuário. O sistema deverá utilizar como tecnologia backend a linguagem NodeJS, em sua versão mais atual, banco de dados Postgres, e para o frontend VueJS. 

<br>

<span id="proposta">
  
## :dart: Proposta

> **Requisitos Funcionais**

- Ao acessar o sistema, login e senha, o usuário deve ser direcionado para a listagem de usuários cadastrados. Caso contrário, deverá ser retornada mensagem de erro, e o usuário deve continuar na tela de login.  

- Deverá ser possível cadastrar novos usuários.  

- Deverá ser possível editar usuários já cadastrados. 

- Deverá ser possível visualizar todos os usuários cadastrados em forma de lista. Os campos apresentados devem ser nome, perfil de acesso, status de criação, e se está ativo. 

- Deverá ser possível desativar um usuário (exclusão lógica). 

- Deverá existir a funcionalidade de ‘esqueci minha senha`. Deve ser enviado e-mail com token, para que o usuário possa criar nova senha no sistema 
 
 <br>
 
 > **Requisitos Não Funcionais**

- Documentação de todo o sistema. Modelagem de banco, e código fonte 

- Manual do usuário 

- Utilização do GCP 

- Utilização de ferramentas para CI/CD (Git, GihubAction, Jenkins, Sonar) 

- Criação de componentes para reaproveitamento de código. 

<br>

<span id="prototipo">
  
## :bulb: Protótipo

**:link: Clique no link abaixo para visualizar o modelo do projeto.**  
> [Protótipo do Projeto]([https://www.figma.com/file/CVTjd7Q6JZlAeHtRpOkRzp/PrototipoTrackCash?node-id=0%3A1](https://www.figma.com/file/gHpxxAvYjXMp0ota8KjEIN/API---Visiona?node-id=2003%3A502433&t=SuNcOw9XLdRU1DTd-1))

<br>

<span id="cronograma-das-sprints">

## :calendar: Cronograma das Sprints

<h1 align="center"> <img src = "readme/cronograma-das-sprints.png" height=auto width=800px></h1>

<br>

<span id="backlog-do-produto">

## :pencil: Backlog do Produto

<h1 align="center"> <img src = "readme/backlog-do-produto.png" height=auto width=800px></h1> 

<br>

<span id="backlog-das-sprints">

## :hourglass_flowing_sand: Backlog das Sprints

<h1 align="center"> <img src = "readme/backlog-das-sprints.png" height=1000px width=auto></h1> 

<br>

<span id="burndown-das-sprints">

## :chart_with_downwards_trend: Burndown das Sprints
  
<h3>1ª Sprint</h3>

<h1 align="center"> <img src = "readme/grafico-burndown-sprint-1.PNG" height=350px width=auto></h1> 

<br>
  
<h3>2ª Sprint</h3>

<h1 align="center"> <img src = "readme/grafico-burndown-sprint-2.jpeg" height=350px width=auto></h1>
  
<br>
 
<h3>3ª Sprint</h3>

<h1 align="center"> <img src = "readme/grafico-burndown-sprint-3.JPG" height=350px width=auto></h1>

<br>
 
<h3>4ª Sprint</h3>

<h1 align="center"> <img src = "readme/grafico-burndown-sprint-4.PNG" height=350px width=auto></h1>

<br>

<span id="tecnologias">
  
## :gear: Tecnologias 

<h1 align="center"> <img src = "readme/tecnologias.png" height=auto width=800px></h1> 

<br>

<span id="produto">

## :package: Produto

<h3>1ª Sprint - 13/03 a 02/04</h3>

//

<br>

<h3>2ª Sprint - 03/04 a 23/04</h3>

//
  
<br>

<h3>3ª Sprint - 24/04 a 14/05</h3>

//
  
<br>

<h3>4ª Sprint - 15/05 a 04/06</h3>

//


<br>
  
<span id="modelo-de-dados-relacional">

## :open_file_folder: Modelo de Dados Relacional

<h3>Modelo Conceitual</h3>
    
<h1 align="center"> <img src = "readme/der-modelo-relacional.png" height=auto width=800px></h1>

<br>

<h3>Modelo Lógico</h3>

<h1 align="center"> <img src = "readme/der-modelo-lógico.png" height=auto width=800px></h1>

<br>
  
<span id="equipe">

## :man::computer::woman: Equipe

<br>

|Nome|Função|GitHub|
| -------- |-------- |-------- |
|**Víctor Henrique**|Developer Team|[![](https://bit.ly/3f9Xo0P)](https://github.com/ViktorHenrique)|
|**Nicholas Guilherme**|Developer Team| [![](https://bit.ly/3f9Xo0P)](https://github.com/NicholasGui29)|
|**Elisa Carvalho**|Scrum Master|[![](https://bit.ly/3f9Xo0P)](https://github.com/elisadsc)|
|**Ivan Germano**|Developer Team|[![](https://bit.ly/3f9Xo0P)](https://github.com/Ivan-Duarte)|
|**João Gabriel**|Developer Team|[![](https://bit.ly/3f9Xo0P)](https://github.com/JoaoGRMira)|
|**Rebeca Gama**|Developer Team|[![](https://bit.ly/3f9Xo0P)](https://github.com/RebecaGama)|
|**Thiago Bueno**|Product Owner|[![](https://bit.ly/3f9Xo0P)](https://github.com/TjBueno)|
