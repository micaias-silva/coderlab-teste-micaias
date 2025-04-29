Repositório destinado ao teste técnico da Coder Lab, disponibilizando um CRUD no backend da aplicação com `nest.js` e o implementando no frontend com `react.js`

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
