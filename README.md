# API Frente de Caixa - PDV (Ponto de Venda)

A API PDV é responsável por fornecer endpoints para gerenciamento de um ponto de vendas, nela você encontrará funcionalidades relacionadas a realização operações de categorias, clientes, pedidos, produtos e usuários. Essa documentação orientará você sobre como utilizar a API, incluindo os endpoints disponíveis, os parâmetros necessários e os possíveis códigos de resposta.


## **1 - Configuração da API**

#### **Dependências:**

Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em sua máquina.

#### **Faça o clone do repositório da API:**

```bash
git clone https://github.com/vclemente2/api-frente-de-caixa.git
```

#### **Navegue até o diretório da API:**

```bash
cd api-frente-de-caixa
```

#### **Instale as dependências do projeto:**

```bash
npm install
```

#### **Configuração do Banco de Dados:**

Certifique-se de ter um banco de dados PostgreSQL configurado e as credenciais de acesso disponíveis.

Execute as migrações do banco de dados para criar a estrutura necessária:

```bash
npx sequelize-cli db:migrate
```

Execute os seeders para popular o banco de dados com dados iniciais:

```bash
npx sequelize-cli db:seed:all
```

#### **Configuração das Variáveis de Ambiente:**

Crie um arquivo **.env** na raiz do projeto.

Abra o arquivo .env e adicione as seguintes variáveis de ambiente. Certifique-se de substituir as credenciais pelas configurações adequadas:

```Javascript
# Porta em que a aplicação irá ouvir
PORT=3000

# Senha do JWT para geração e validação do token
JWT_HASH='jsonwebtoken_password'

# Credenciais do banco de dados de desenvolvimento
DB_HOST='database_host'
DB_NAME='database_name'
DB_USER='database_user'
DB_PASS='database_password'
DB_PORT=5432
DB_CLIENT='postgres'

# Credenciais do banco de dados de teste
DB_TEST_HOST='test_database_host'
DB_TEST_NAME='test_database_name'
DB_TEST_USER='test_database_user'
DB_TEST_PASS='test_database_password'
DB_TEST_PORT=5432
DB_TEST_CLIENT='postgres'

# Credenciais do servidor de email
MAIL_HOST='mail_host'
MAIL_PORT=465
MAIL_USER='mail_user'
MAIL_PASS='mail_password'
MAIL_NAME='from_name'
MAIL_FROM='from_email'

# Credenciais do servidor de upload de arquivo
KEY_ID='key_id'
KEY_NAME='key_name'
APP_KEY='app_key'
BACKBLAZE_BUCKET='bucket_name'
ENDPOINT_S3='endpoint'
```

**Nota:** Certifique-se de substituir as credenciais pelas suas configurações.

Salve o arquivo .env.

#### **Executando a API**

Após a instalação das dependências, configuração do banco de dados e das variáveis de ambiente, você pode executar a API com o seguinte comando:

```bash
npm run dev
```

A API estará disponível em http://localhost:3000.

Isso conclui a configuração da API. Certifique-se de ter configurado corretamente todas as variáveis de ambiente e seguido as etapas corretamente para garantir um ambiente funcional.


## **2 - Utilização da API**

### **Endpoints**
A seguir, são listados os endpoints disponíveis na API PDV.


### **Listar categorias**
Retorna todas as categorias cadastradas.

#### `Método: GET`
#### `Rota: /categoria`

#### **Resposta de sucesso:**
`HTTP 200 Ok`
```JSON
[    
    {        
        "id": 1,
        "descricao": "Informática"
    },
    {
        "id": 2,
        "descricao": "Celulares"
    },
    {
        "id": 3,
        "descricao": "Beleza e Perfumaria"
    },
    {
        "id": 4,
        "descricao": "Mercado"
    },
    {
        "id": 5, 
        "descricao": "Livros e Papelaria" 
    },
    { 
        "id": 6,
        "descricao": "Brinquedos" 
    },
    {
        "id": 7,
        "descricao": "Moda"
    },
    {
        "id": 8,
        "descricao": "Bebê"
    },
    {
        "id": 9,
        "descricao": "Games"
    },
]
```


### **Cadastrar usuário**
Cadastra um novo usuário no sistema.

#### `Método: POST`
#### `Rota: /usuario`
#### **Corpo da requisição (`JSON`):**
```JSON
{
    "nome": "José",
    "email": "jose@example.com",
    "senha": "jose"
}
```

#### **Resposta de sucesso:**
`HTTP 201 Created`
```JSON
{
	"id": 1,
	"nome": "José",
	"email": "jose@example.com"
}
```

#### **Critérios de aceite:**
* Todos os campos obrigatórios serão validados: nome, email e senha.
* A senha será criptografada usando um algoritmo confiável.
* O campo de e-mail deve ser único para cada usuário.


### **Efetuar login do usuário**
Permite que um usuário cadastrado faça login no sistema.

#### `Método: POST`
#### `Rota: /login`
#### **Corpo da requisição (`JSON`):**
```JSON
{
    "email": "jose@example.com",
    "senha": "jose"
}
```

#### **Resposta de sucesso:**
`HTTP 200 Ok`
```JSON
{
	"id": 1,
	"nome": "José",
	"email": "jose@example.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0NDU2NDczLCJleHAiOjE2ODQ0ODUyNzN9.-xOmwZ5REcAOKX76EW1fzk4G9nBvhWhjdWwiDcC58Eo"
}
```

#### **Critérios de aceite:**
* Valida se o e-mail e a senha estão corretos para o usuário em questão.
* Gera um token de autenticação para o usuário.

```
Nota: A partir deste ponto, todos os endpoints exigem o token de autenticação do usuário logado, enviado no header da requisição com o formato Bearer Token. Certifique-se de incluir o token válido em todas as requisições subsequentes.
```


### **Detalhar perfil do usuário logado**
Retorna os dados do perfil do usuário logado.

#### `Método: GET`
#### `Rota: /usuario`
#### **Resposta de sucesso:**
`HTTP 200 Ok`
```JSON
{
	"id": 1,
	"nome": "José",
	"email": "jose@example.com"
}
```


### **Editar perfil do usuário logado**
Permite ao usuário logado atualizar as informações do seu perfil.

#### `Método: PUT`
#### `Rota: /usuario`
#### **Corpo da requisição (`JSON`):**

```JSON
{
    "nome": "Novo Nome",
    "email": "novoemail@example.com",
    "senha": "novasenha"
}
```
#### **Resposta de sucesso:**
`HTTP 204 No Content`

#### **Critérios de aceite:**
* Todos os campos obrigatórios serão validados: nome, email e senha.
* A senha será criptografada usando um algoritmo confiável.
* O campo de e-mail deve ser único para cada usuário.


### **Cadastrar produto**
Permite ao usuário logado cadastrar um novo produto no sistema.

#### `Método: POST`
#### `Rota: /produto`
#### **Corpo da requisição (`JSON`):**
```JSON
{
    "descricao": "Notebook",
    "quantidade_estoque": 10,
    "valor": 250000,
    "categoria_id": 1
}
```

#### **Resposta de sucesso:**
`HTTP 201 Created`
```JSON
{
    "id": 1234,
    "descricao": "Notebook",
    "quantidade_estoque": 10,
    "valor": 250000,
    "categoria_id": 1,
    "produto_imagem": null
}
```

#### **Critérios de aceite:**
* Todos os campos obrigatórios devem ser validados: descricao, valor, quantidade e categoria.
* O campo de categoria_id deve corresponder a uma categoria existente no sistema.

**Nota:** O campo produto_imagem é opcional e caso seja passado, deve ser informado a url da imagem no servidor de armazenamento, essa url pode ser obtida através da rota `/arquivo`


### **Listar produtos**
Retorna todos os produtos cadastrados no sistema. É possível filtrar os produtos por categoria utilizando o parâmetro de query "categoria_id".

#### `Método: GET`
#### `Rota: /produto`
#### **Parâmetros de consulta:**
```
categoria_id (opcional): O ID da categoria
```
#### **Resposta de sucesso:**
`HTTP 200 Ok`
```JSON
[    
    {        
        "id": 1,        
        "descricao": "Notebook",        
        "quantidade_estoque": 10,        
        "valor": 250000,        
        "categoria_id": 1,
        "produto_imagem": null
    },    
    {        
        "id": 2,        
        "descricao": "Smartphone",        
        "quantidade_estoque": 5,        
        "valor": 150000,        
        "categoria_id": 1,
        "produto_imagem": null
    }
]
```


### **Detalhar produto**
Retorna os detalhes de um produto específico.

#### `Método: GET`
#### `Rota: /produto/{id}`
#### **Parâmetros de URL:**
```
id: o ID do produto
```

#### **Responsa de sucesso:**
`HTTP 200 Ok`
```JSON
{
    "id": 1,
    "descricao": "Notebook",
    "valor": 250000,
    "quantidade_estoque": 10,
    "categoria_id": 1
}
```


### **Atualizar produto**
Permite ao usuário logado atualizar as informações de um produto específico.

#### `Método: PUT`
#### `Rota: /produto/{id}`
#### **Parâmetros de URL:**
```
id: o ID do produto
```

#### **Corpo da requisição (`JSON`):**
```JSON
{
    "descricao": "Novo Notebook",
    "preco": 280000,
    "quantidade_estoque": 15,
    "categoria_id": 1
}
```

#### **Resposta de sucesso:**
`HTTP 204 No Content`

#### **Critérios de aceite:**
* Todos os campos obrigatórios devem ser validados: descricao, valor, quantidade e categoria.
* O campo de categoria_id deve corresponder a uma categoria existente no sistema.

**Nota:** O campo produto_imagem é opcional e caso seja passado, deve ser informado a url da imagem no servidor de armazenamento, essa url pode ser obtida através da rota `/arquivo`


### **Remover produto**
Permite ao usuário logado remover um produto do sistema.

#### `Método: DELETE`
#### `Rota: /produto/{id}`
#### **Parâmetros de URL:**
```
id: o ID do produto
```

#### **Resposta de sucesso:**
`HTTP 204 No Content`

#### **Critérios de aceite:**
* O ID informado deve pertencer a um produto cadastrado.
* O produto correspondente ao ID fornecido será removido do sistema.
* Caso o produto possua uma imagem vinculada, a mesma será excluída do servidor de armazenamento de arquivos.

**Nota**: Não será permitida a exclusão de um produto que esteja registrado em algum pedido.


### **Cadastrar cliente**
Permite ao usuário logado cadastrar um novo cliente no sistema.

#### `Método: POST`
#### `Rota: /cliente`
#### **Corpo da requisição (`JSON`):**
```JSON
{
    "nome": "Maria",
    "email": "maria@example.com",
    "cpf": "12345678901",
    "cep": "22750180",
	"numero": "10",
}
```
#### **Resposta de sucesso:**
`HTTP 201 Created`
```JSON
{
    "id": 123,
    "nome": "Maria",
    "email": "maria@example.com",
    "cpf": "12345678901",
    "cep": "22750180",
    "numero": "10",
	"rua": "Rua Zanoni Ferrite",
	"bairro": "Anil",
	"cidade": "Rio de Janeiro",
	"estado": "RJ"
}
```

#### **Critérios de aceite:**
* Todos os campos obrigatórios devem ser validados: nome, email e cpf.
* Os campos de email e cpf devem ser únicos para cada cliente.


### **Listar clientes**
Retorna todos os clientes cadastrados no sistema.

#### `Método: GET`
#### `Rota: /cliente`
#### **Resposta de sucesso:**
`HTTP 200 Ok`
```JSON
[
    {
        "id": 1,
        "nome": "Maria",
        "email": "maria@example.com",
        "cpf": "12345678901",
        "cep": "22750180",
        "numero": "10",
        "rua": "Rua Zanoni Ferrite",
        "bairro": "Anil",
        "cidade": "Rio de Janeiro",
        "estado": "RJ"
    },
    {
        "id": 2,
        "nome": "João",
        "email": "joao@example.com",
        "cpf": "98765432101",
        "cep": null,
        "numero": null,
        "rua": null,
        "bairro": null,
        "cidade": null,
        "estado": null
    }
]
```


### **Detalhar cliente**
Retorna os detalhes de um cliente específico.

#### `Método: GET`
#### `Rota: /cliente/{id}`
#### **Parâmetros de URL:**
```
id: o ID do cliente
```

#### **Resposta de sucesso:**
`HTTP 200 Ok`
```JSON
{
    "id": 1,
    "nome": "Maria",
    "email": "maria@example.com",
    "cpf": "12345678901",
    "cep": "22750180",
    "numero": "10",
    "rua": "Rua Zanoni Ferrite",
    "bairro": "Anil",
    "cidade": "Rio de Janeiro",
    "estado": "RJ"
}
```


### **Atualizar cliente**
Permite ao usuário logado atualizar as informações de um cliente específico.

#### `Método: PUT`
#### `Rota: /cliente/{id}`
#### **Parâmetros de URL:**
```
id: o ID do cliente
```

#### **Corpo da requisição (`JSON`):**
```JSON
{
    "nome": "Maria Silva",
    "email": "maria.silva@example.com",
    "cpf": "98765432102",
    "cep": "22750130",
    "numero": "20",
}
```

#### **Resposta de sucesso:**
`HTTP 204 No Content`

#### **Critérios de aceite:**
* Todos os campos obrigatórios devem ser validados: nome, email e cpf.
* Os campos de email e cpf devem ser únicos para cada cliente.


### **Cadastrar Pedido**
Cadastra um novo pedido no sistema.

#### `Método: POST`
#### `Rota: /pedido`
#### **Corpo da requisição:**
```JSON
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```

#### **Resposta de sucesso:**
`HTTP 201 Created`
```JSON
{
	"id": 3,
	"dados_cliente": {
		"cliente": "Maria Silva",
        "email":"maria.silva@example.com",
		"cpf": "98765432102"
	},
	"itens_pedido": [
		{
			"descricao": "Mouse",
			"produto_id": 1,
			"quantidade_produto": 1,
			"valor_produto": 2500
		},
		{
			"descricao": "Teclado",
			"produto_id": 3,
			"quantidade_produto": 3,
			"valor_produto": 5000
		}
	],
	"valor_total": 17500,
	"observacao": ""
}
```
#### **Critérios de aceite:**
* Valida os campos obrigatórios:
    * cliente_id
    * pedido_produtos
    * produto_id
    * quantidade_produto
* Valida se existe um cliente com o ID fornecido no corpo da requisição.
* Valida se existe um produto para cada produto_id informado no array de pedido_produtos.
* Valida se há quantidade suficiente em estoque para cada produto no array de pedido_produtos, de acordo com a quantidade informada.
* O pedido será cadastrado apenas se todos os produtos forem validados.

**Nota:** Caso o pedido seja concluído, um e-mail será disparado para o cliente notificando que o pedido foi efetuado com sucesso.


### **Listar pedidos**
Retorna todos os pedidos cadastrados no sistema. É possível filtrar os pedidos por cliente utilizando o parâmetro de query "cliente_id".

#### `Método: GET`
#### `Rota: /pedido`
#### **Parâmetros de query:**
```
cliente_id (opcional): o ID do cliente para filtrar os pedidos
```

#### **Resposta de sucesso:**
`HTTP 200 Ok`
```JSON
[
    {
        "pedido": {
            "id": 1,
            "valor_total": 230010,
            "observacao": null,
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 1,
                "quantidade_produto": 1,
                "valor_produto": 10,
                "pedido_id": 1,
                "produto_id": 1
            },
            {
                "id": 2,
                "quantidade_produto": 2,
                "valor_produto": 230000,
                "pedido_id": 1,
                "produto_id": 2
            }
        ]
    }
]
```

#### **Critérios de aceite:**
* Caso seja informado o parâmetro "cliente_id", os pedidos serão filtrados por cliente. Caso o ID do cliente informado exista.
* Caso não seja informado o parâmetro "cliente_id", todos os pedidos cadastrados serão retornados.


### **Upload de imagem**
Realiza o upload de uma imagem para o servidor de armazenamento.

#### `Método: POST`
#### `Rota: /arquivo/upload`
#### **Corpo da requisição (`multipart/form-data`):**
```
imagem: arquivo de imagem a ser enviado para o servidor de armazenamento
```

#### **Resposta de sucesso:**
`HTTP 201 Created`
```JSON
{
	"url": "https://exemplo.com/c5e20429-d950-46fc-92aa-ffff4a696b2e",
	"path": "c5e20429-d950-46fc-92aa-ffff4a696b2e"
}
```
#### **Critérios de aceite:**
* Valida se a propriedade "imagem" foi informada no corpo da requisição.
* Recebe a propriedade "imagem" e envia para o servidor de armazenamento.
* Obtém e retorna a URL da imagem que teve o upload concluído.


### **Listar imagens**
Obtém as URLs de todas as imagens armazenadas no servidor de armazenamento.

#### `Método: GET`
#### `Rota: /arquivo`

#### **Resposta de sucesso:**
`HTTP 201 Created`
```JSON
[
    {
        "url": "https://exemplo.com/c5e20429-d950-46fc-92aa-ffff4a696b2e",
        "path": "c5e20429-d950-46fc-92aa-ffff4a696b2e"
    },
    {
        "url": "https://exemplo.com/h4e20429-d950-46fc-92aa-ffff4a69yhagu",
        "path": "h4e20429-d950-46fc-92aa-ffff4a69yhagu"
    }
]
```

#### **Critérios de aceite:**
* Obter e retornar a URL e o diretório de todas as imagens armazenadas no servidor de armazenamento.