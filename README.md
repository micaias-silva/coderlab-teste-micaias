Repositório destinado ao teste técnico da Coder Lab, disponibilizando um CRUD no backend da aplicação com `nest.js` e o implementando no frontend com `react.js`

# Importante
Devido à situação de incompletude do frontend, dada as razões informadas no e-mail enviado, continuei desenvolvendo as partes imcompletas do projeto em uma branch separada chamada ```postDeadLine/Development```, onde se encontrarão as atualizações. Caso esta branch possa ser considerada para avaliação do teste técnico, basta utilizá-la como base: todas as atualizações mais recentes estão concentradas nela.
Ultima Atualização às 15:36

# Instalação e iniciação do repositório
```Bash
docker compose up
```

## População do banco de dados
Vai preencher o banco de dados com as categorias iniciais
```Bash
docker exec -t micaias_backend_server npx prisma db seed
```
## Acessando as aplicações
### Backend
A aplicação backend instanciada pelo docker será hosperada em [http://localhost:3000](http://localhost:3000)
### Frontend
A aplicação front instanciada pelo docker será hosperada em [http://localhost:3001](http://localhost:3001)

## Tecnologias Utilizadas

### Banco de Dados
- `PostgreSQL`
  
### Backend
- `Nest.js`
- `Prisma`
- `class-validator`

### Frontend
- `Vite`
- `React.js`
- `Axios`
- `react-router-dom@v7`

## Endpoints
### `Product`

```BASH
GET /product          # RETORNA UM RESPONSE PAGINADO COM TODOS OS PRODUTOS CADASTRADOS
GET /product/:id      # RETORNA UM PRODUTO ESPECIFICADO ATRAVÉS DO ID
POST /product         # CRIA UM NOVO PRODUTO
PATCH /product/:id    # ATUALIZA OS DADOS DE UM NOVO PRODUTO
DELETE /product/:id   # REMOVE UM PRODUTO DO BANCO DE DADOS
```

### `Category`
```Bash
GET /category         # RETORNA TODAS AS CATEGORIAS CADASTRADAS
```
## Routes (Frontend)

```Bash
/                      # PÁGINA DE EXIBIÇÃO DE TODOS OS PRODUTOS
/product/:id           # PÁGINA DE EXIBIÇÃO DE UM PRODUTO INDIVIDUAL
/product/create        # PÁGINA CONTENDO O FORMULÁRIO DE CRIAÇÃO DE UM NOVO PRODUTO
/product/update/:id    # PÁGINA CONTENDO O FORMULÁRIO DE ATUALIZAÇÃO DOS DADOS DE UM PRODUTO
```
## Diagrama Banco de Dados
![Diagrama](https://i.imgur.com/u52Q2Q7.jpeg)

