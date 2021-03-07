# PIZZA-PLACE-API

## Configuração Inicial

    Após clonar o projeto para o workspace, deverá ser instalado as dependências dele com o comando

    ``ǹpm i```

## Arquitetura

Este projeto segue a arquitetura mais utilizada pelo mercado, o MVC (Model-View-Controller).
Aliado a esta arquitetura, esta API será uma API REST. Assim, cada camada da API está separada por suas responsabilidades.

Abaixo segue a descrição da arquitetura.

### Controllers

    Esta pasta contém os arquivos que representam a camada resposável pela lógica do sistema.

### Database

    Camada de configuração do banco de dados.

### Models

    Camada com todos arquivos que fazem o mapeamento dos objetos em banco de dados.

### Repositories

    Camada reponsável por fazer o acesso ao banco de dados.

### Routes

    Camada que contém todas as rotas do sistema.

### Services

    Camada de serviço que fará as interações externas ao sistema.
