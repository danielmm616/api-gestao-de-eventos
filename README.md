<h1 align="center">
    Gestão de Eventos - API
</h1>

### Uma API para criar e participar de eventos.

<br>
<p align="center">
Uma API completa em Node.js onde empresas podem criar e marcar eventos, enquanto isso os usuários podem buscar e comprar ingressos para participar!
</p>
<br>
<blockquote align="center">
<br>
"Bela, não é? Perfeitamente balanceada. Como todas coisas deveriam ser" 
<br>
 - Thanos
<br>
<br>
</blockquote>
<br>

### Technologias utilizadas:

- Node.JS
- Express e TypeORM
- Yup - validação e serialização
- PostgreSQL - banco de dados
- Docker/Docker-Compose
- Jest - Testes de integração 

<br>

### Back-End API Url base:

- http://localhost:3000/api

<br>

### Para a aplicação funcionar, basta rodar:

```
docker-compose up --build
```

## **Endpoints**

A API tem um total de 21 endpoints, com utilidades tanto para as empresas quanto para os usuários comuns, a maioria delas necessitando do token de login, as únicas que não necessitam são as de login e cadastro.

<br>

<h2 align="center">Criação de usuário/empresa</h2>

`POST /users/register - FORMATO DA REQUISIÇÃO - STATUS 201`

<br>

`POST /companies/register - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "name": "João Silva",
  "bio": "Front End Developer",
  "email": "joao@mail.com",
  "password": "1234"
}
```

Caso dê tudo certo, a resposta será assim:

```json
{
  "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f",
  "name": "João Silva",
  "bio": "Front End Developer",
  "email": "joao@mail.com"
}
```

<br>

<h2 align="center">Login de usuário/empresa</h2>

`POST /users/login - FORMATO DA REQUISIÇÃO - STATUS 200`

`POST /companies/login - FORMATO DA REQUISIÇÃO - STATUS 200`

```json
{
  "email": "joao@mail.com",
  "password": "1234"
}
```

Caso dê tudo certo, a resposta será assim:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjc3OGE1LTM5ZWEtNDYyNC1hYjJhLThmYjdhNTExNDkwZiIsImlhdCI6MTY1NjQyNDcwNiwiZXhwIjoxNjU2NTExMTA2fQ.J_PH_xIhQrteYuOcP7Qxz5XE5txMJZQxuwFB4A2GQdk"
}
```

<br>

<h2 align="center">Listando usuários/empresas</h2>

`GET /users - FORMATO DA REQUISIÇÃO - STATUS 200`

`GET /companies - FORMATO DA REQUISIÇÃO - STATUS 200`

Caso dê tudo certo, a resposta será assim:

```json
[
	{
		"email": "joao@mail.com",
		"bio": "Front End Developer",
		"name": "João Silva",
		"id": "5db778a5-39ea-4624-ab2a-8fb7a511490f"
	},
    {
        "email": "daniel@mail.com",
        "bio": "Full Stack Developer",
        "name": "Daniel Morais",
        "id": "8ds455d4-15qw-8642-ab2a-8fb7a158793f"
    },
    {...}
]
```

<br>

<h2 align="center">Listando um específico usuário/empresa</h2>

`GET /users/:user_id - FORMATO DA REQUISIÇÃO - STATUS 200`

`GET /companies/:company_id - FORMATO DA REQUISIÇÃO - STATUS 200`

Caso dê tudo certo, a resposta será assim:

```json
{
  "email": "joao@mail.com",
  "bio": "Front End Developer",
  "name": "João Silva",
  "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f"
}
```

<br>

<h2 align="center">Criando um evento</h2>

`POST /events/create - FORMATO DA REQUISIÇÃO - STATUS 201`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

```json
{
  "name": "Feira de pesquisas",
  "description": "Terá várias pesquisas científicas no ramo da biologia",
  "price": 25.0,
  "date": "05/09/2022",
  "time": "14h",
  "location": "Samambaia"
}
```

Caso dê tudo certo, a resposta será assim:

```json
{
  "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07",
  "name": "Feira de pesquisas",
  "description": "Terá várias pesquisas científicas no ramo da biologia",
  "active": true,
  "price": 25.0,
  "date": "2022-05-09T00:00:00.000Z",
  "location": "Samambaia",
  "time": "14h",
  "invoices": [],
  "users": [],
  "company": {
    "email": "google@gmail.com",
    "bio": "Faça uma pesquisa",
    "name": "Google",
    "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a"
  }
}
```

<br>

<h2 align="center">Encerrando um evento</h2>

`PUT /events/:event_id - FORMATO DA REQUISIÇÃO - STATUS 204`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
    No body returned for response
```

<br>

<h2 align="center">Deletando um evento</h2>

`DELETE /events/:event_id - FORMATO DA REQUISIÇÃO - STATUS 204`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
    No body returned for response
```

<br>

<h2 align="center">Listando eventos</h2>

`GET /events - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
[
  {
    "active": true,
    "location": "Samambaia",
    "time": "14h",
    "date": "2022-05-09T00:00:00.000Z",
    "price": 25.0,
    "description": "terá várias pesquisas",
    "name": "Feira de pesquisas",
    "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07"
  },
  {
    "active": true,
    "location": "São Paulo",
    "time": "17h",
    "date": "2022-09-05T00:00:00.000Z",
    "price": 50.0,
    "description": "Evento para nerds e geeks",
    "name": "Brasil Game Show",
    "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07"
  }
]
```

<br>

<h2 align="center">Listando evento específico</h2>

`GET /events/:event_id - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
{
  "active": true,
  "location": "São Paulo",
  "time": "17h",
  "date": "2022-09-05T00:00:00.000Z",
  "price": 50.0,
  "description": "Evento para nerds e geeks",
  "name": "Brasil Game Show",
  "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07",
  "company": {
    "id": "c8edc0ad-d6d5-4756-b4e5-ea9cbddd884f",
    "name": "Google",
    "bio": "Faça uma pesquisa",
    "email": "google@gmail.com",
    "password": "$2b$08$FArEgzEjvTpRVIy1sLgCWuRDWNYv7M1jjZZPh0/yS2uHBit0KxFLq"
  }
}
```

<br>

<h2 align="center">Criando pedido de ingresso</h2>

`POST /orders/:event_id/create - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

```json
{
  "quantity": 2
}
```

Caso dê tudo certo, a resposta será assim:

```json
{
  "quantity": 2,
  "price": 25.0,
  "id": "d0f1ee89-f18d-4a19-bc28-76cc8606a368",
  "user": {
    "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f",
    "name": "João Silva",
    "bio": "Front End Developer",
    "email": "joao@mail.com",
    "password": "$2b$08$KaDM83U.HhFQFUwzgNuxH.WFhe7IhcVbNvJ7fCduHvb2UkuoZwZUe",
    "company": null,
    "event": null
  },
  "event": {
    "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07",
    "name": "Feira de pesquisas",
    "description": "terá várias pesquisas",
    "price": 25.0,
    "date": "2022-05-09T00:00:00.000Z",
    "time": "14h",
    "location": "Samambaia",
    "active": true,
    "company": {
      "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a",
      "name": "Google",
      "bio": "Faça uma pesquisa",
      "email": "google@gmail.com",
      "password": "$2b$08$.Un339h.Kka4dgEgAUTxg.4eXU4k1n.5d8QKTUhOubQzfHpFkGCL6"
    }
  }
}
```

<br>

<h2 align="center">Cancelando pedido de ingresso</h2>

`DELETE /orders/:order_id - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
{
  "id": "15eb66d7-5873-40ed-9286-c6fb800ad1d9",
  "quantity": 2,
  "price": 2.5,
  "user": {
    "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f",
    "name": "João Silva",
    "bio": "Front End Developer",
    "email": "joao@mail.com",
    "password": "$2b$08$KaDM83U.HhFQFUwzgNuxH.WFhe7IhcVbNvJ7fCduHvb2UkuoZwZUe",
    "company": null,
    "event": null
  },
  "event": {
    "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07",
    "name": "Feira de pesquisas",
    "description": "terá várias pesquisas",
    "price": 2.5,
    "date": "2022-05-09T00:00:00.000Z",
    "time": "14h",
    "location": "Samambaia",
    "active": true,
    "company": {
      "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a",
      "name": "Google",
      "bio": "Faça uma pesquisa",
      "email": "google@gmail.com",
      "password": "$2b$08$.Un339h.Kka4dgEgAUTxg.4eXU4k1n.5d8QKTUhOubQzfHpFkGCL6"
    }
  },
  "invoice": null
}
```

<br>

<h2 align="center">Pagando ingresso</h2>

`PUT /orders/:order_id/pay - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
{
  "purchaseDate": "2022-06-29T14:03:15.965Z",
  "totalPrice": 50.0,
  "id": "737ee96c-6da6-496a-af88-f7f605315682",
  "event": {
    "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07",
    "name": "Feira de pesquisas",
    "description": "terá várias pesquisas",
    "price": 25.0,
    "date": "2022-05-09T00:00:00.000Z",
    "time": "14h",
    "location": "Samambaia",
    "active": true,
    "company": {
      "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a",
      "name": "Google",
      "bio": "Faça uma pesquisa",
      "email": "google@gmail.com",
      "password": "$2b$08$.Un339h.Kka4dgEgAUTxg.4eXU4k1n.5d8QKTUhOubQzfHpFkGCL6"
    }
  }
}
```

<br>

<h2 align="center">Listando orders(pagas e não pagas)</h2>

`GET /orders - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
[
  {
    "invoice": {
      "totalPrice": 5,
      "purchaseDate": "2022-06-28T14:03:25.971Z",
      "id": "22479766-f13d-4c94-b20e-f9d0a822f094"
    },
    "event": {
      "company": {
        "name": "Google",
        "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a"
      },
      "active": true,
      "location": "Samambaia",
      "time": "14h",
      "date": "2022-05-09T00:00:00.000Z",
      "description": "terá várias pesquisas",
      "name": "Feira de pesquisas",
      "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07"
    },
    "user": {
      "name": "João Silva",
      "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f"
    },
    "price": 25.0,
    "quantity": 2,
    "id": "6f7fc956-1a04-4677-a5fc-c3989aa377c1"
  },
  {
    "invoice": null,
    "event": {
      "company": {
        "name": "Amazon",
        "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a"
      },
      "active": true,
      "location": "São Paulo",
      "time": "18h",
      "date": "2022-05-09T00:00:00.000Z",
      "description": "Venha se aventurar no mundo da literatura",
      "name": "Feira do livro",
      "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07"
    },
    "user": {
      "name": "João Silva",
      "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f"
    },
    "price": 25.0,
    "quantity": 2,
    "id": "6f7fc956-1a04-4677-a5fc-c3989aa377c1"
  }
]
```

<br>

<h2 align="center">Avaliando evento</h2>

`POST /ratings/:event_id - FORMATO DA REQUISIÇÃO - STATUS 201`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

```json
{
  "stars": 3,
  "title": "Algo deu errado",
  "description": "Muita sujeira e falta de cuidado"
}
```

Caso dê tudo certo, a resposta será assim:

```json
{
  "stars": 3,
  "title": "Algo deu errado",
  "description": "Muita sujeira e falta de cuidado",
  "user": {
    "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f",
    "name": "João Silva",
    "bio": "Front End Developer",
    "email": "joao@mail.com",
    "password": "$2b$08$KaDM83U.HhFQFUwzgNuxH.WFhe7IhcVbNvJ7fCduHvb2UkuoZwZUe",
    "company": null,
    "event": null
  },
  "event": {
    "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07",
    "name": "Feira de pesquisas",
    "description": "terá várias pesquisas",
    "price": 2.5,
    "date": "2022-05-09T00:00:00.000Z",
    "time": "14h",
    "location": "Samambaia",
    "active": true,
    "company": {
      "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a",
      "name": "Google",
      "bio": "Faça uma pesquisa",
      "email": "google@gmail.com",
      "password": "$2b$08$.Un339h.Kka4dgEgAUTxg.4eXU4k1n.5d8QKTUhOubQzfHpFkGCL6"
    }
  },
  "id": "03aecde6-680c-4a84-9ac2-8dc4b42e65e8"
}
```

<br>

<h2 align="center">Atualizando avaliação</h2>

`PATCH /ratings/:rating_id - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

```json
{
  "stars": 2
}
```

Caso dê tudo certo, a resposta será assim:

```json
{
  "id": "03aecde6-680c-4a84-9ac2-8dc4b42e65e8",
  "title": "Algo deu errado",
  "description": "Muita sujeira e falta de cuidado",
  "stars": 2,
  "event": {
    "id": "b8dec697-20f6-4e1b-ba1d-35f785dadf07",
    "name": "Feira de pesquisas",
    "description": "terá várias pesquisas",
    "price": 2.5,
    "date": "2022-05-09T00:00:00.000Z",
    "time": "14h",
    "location": "Samambaia",
    "active": true,
    "company": {
      "id": "58b983f4-57a9-4e07-9377-52ac9ebdd61a",
      "name": "Google",
      "bio": "Faça uma pesquisa",
      "email": "google@gmail.com",
      "password": "$2b$08$.Un339h.Kka4dgEgAUTxg.4eXU4k1n.5d8QKTUhOubQzfHpFkGCL6"
    }
  },
  "user": {
    "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f",
    "name": "João Silva",
    "bio": "Front End Developer",
    "email": "joao@mail.com",
    "password": "$2b$08$KaDM83U.HhFQFUwzgNuxH.WFhe7IhcVbNvJ7fCduHvb2UkuoZwZUe",
    "company": null,
    "event": null
  }
}
```

<br>

<h2 align="center">Listando avaliações de um evento</h2>

`GET /ratings/:event_id - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
[
  {
    "user": {
      "bio": "Front End Developer",
      "name": "João Silva",
      "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f"
    },
    "description": "Evento horrível, muito pouco cuidado",
    "title": "Otimo",
    "stars": 1,
    "id": "896be714-43d5-4bc2-8049-493f5e967dd2"
  },
  {
    "user": {
      "bio": "Enfermeira",
      "name": "Maria Silva",
      "id": "5db778a5-39ea-4624-ab2a-8fb7a511490f"
    },
    "description": "Evento maravilhoso, aprendi muitas coisas",
    "title": "Otimo",
    "stars": 5,
    "id": "896be714-43d5-4bc2-8049-493f5e967dd2"
  }
]
```

<br>

<h2 align="center">Deletando avaliação</h2>

`DELETE /ratings/:rating_id - FORMATO DA REQUISIÇÃO - STATUS 200`

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Caso dê tudo certo, a resposta será assim:

```json
    No body returned for response
```
