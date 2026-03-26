# 🍔 Dev Burguer API

![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-blue?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=jsonwebtokens)

API REST completa para sistema de delivery de hambúrgueres, desenvolvida com Node.js, Express e arquitetura multi-banco de dados (PostgreSQL + MongoDB).

## 📋 Sumário

- [Recursos](#-recursos)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [API Endpoints](#-api-endpoints)
- [Autenticação](#-autenticação)
- [Banco de Dados](#-banco-de-dados)
- [Upload de Arquivos](#-upload-de-arquivos)
- [Pagamentos](#-pagamentos)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Docker](#-docker)
- [Contribuição](#-contribuição)

## 🚀 Recursos

- ✅ **Autenticação JWT** com diferentes níveis de acesso (usuário/admin)
- ✅ **CRUD completo** para produtos, categorias e usuários
- ✅ **Sistema de pedidos** com MongoDB para alta performance
- ✅ **Upload de imagens** para produtos e categorias
- ✅ **Integração Stripe** para processamento de pagamentos
- ✅ **Validação de dados** com Yup
- ✅ **Middlewares de segurança** e CORS configurado
- ✅ **Migrações automáticas** do banco de dados
- ✅ **Containerização** com Docker

## 🛠 Tecnologias

### Backend
- **Node.js** 20 - Runtime JavaScript
- **Express** 5.2.1 - Framework web
- **JWT** - Autenticação e autorização

### Banco de Dados
- **PostgreSQL** - Dados principais (usuários, produtos, categorias)
- **Sequelize** 6.37.7 - ORM para PostgreSQL
- **MongoDB** - Sistema de pedidos
- **Mongoose** 9.1.0 - ODM para MongoDB

### Utilitários
- **Multer** 2.0.2 - Upload de arquivos
- **Stripe** 20.4.1 - Processamento de pagamentos
- **bcryptjs** 3.0.3 - Hash de senhas
- **Yup** 1.7.1 - Validação de schemas
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **UUID** 13.0.0 - Geração de IDs únicos

### Desenvolvimento
- **Biome** 2.3.8 - Linter e formatter
- **dotenv** 17.3.1 - Variáveis de ambiente

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 12+
- MongoDB 4.4+
- pnpm (recomendado) ou npm

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/dev-burguer-api.git
cd dev-burguer-api
```

### 2. Instale as dependências
```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

### 4. Execute as migrações
```bash
pnpm sequelize db:migrate
# ou
npx sequelize db:migrate
```

### 5. Inicie o servidor
```bash
pnpm dev
# ou
npm run dev
```

A API estará disponível em `http://localhost:3001`

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# Banco PostgreSQL
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=123456
DB_DATABASE=dev-burguer-db

# MongoDB
MONGO_URL=mongodb://localhost:27017/dev-burguer-db

# Servidor
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui

# JWT (opcional - usa fallback se não configurado)
JWT_SECRET=ce3ccdabbe9a2bf4d9333f45d215990b
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento com hot-reload
pnpm dev

# Produção
pnpm start

# Linting
pnpm biome check

# Formatação
pnpm biome format --write
```

## 🛣 API Endpoints

### 📝 Autenticação
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| POST | `/users` | Cadastro de usuário | ❌ |
| POST | `/sessions` | Login | ❌ |

### 🍔 Produtos  
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| GET | `/products` | Listar produtos | ✅ |
| POST | `/products` | Criar produto | 👑 Admin |
| PUT | `/products/:id` | Atualizar produto | 👑 Admin |

### 📂 Categorias
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| GET | `/categories` | Listar categorias | ✅ |
| POST | `/categories` | Criar categoria | 👑 Admin |
| PUT | `/categories/:id` | Atualizar categoria | 👑 Admin |

### 🛒 Pedidos
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| POST | `/orders` | Criar pedido | ✅ |
| GET | `/orders` | Listar meus pedidos | ✅ |
| PUT | `/orders/:id` | Atualizar status | 👑 Admin |

### 💳 Pagamentos
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| POST | `/create-payment-intent` | Criar intenção de pagamento | ✅ |

### 🖼 Arquivos
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| GET | `/product-file/:filename` | Imagem do produto | ❌ |
| GET | `/category-file/:filename` | Imagem da categoria | ❌ |

## 🔐 Autenticação

### JWT Token
A API utiliza JWT (JSON Web Tokens) para autenticação:

```javascript
// Headers das requisições protegidas
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Níveis de Acesso
- **❌ Público**: Sem autenticação necessária
- **✅ Usuário**: Requer token JWT válido
- **👑 Admin**: Requer token JWT + flag `admin: true`

### Exemplo de Login
```javascript
// POST /sessions
{
  "email": "admin@devburger.com",
  "password": "123456"
}

// Resposta
{
  "id": "uuid-do-usuario",
  "name": "Admin User",
  "email": "admin@devburger.com",
  "admin": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🗄 Banco de Dados

### PostgreSQL (Sequelize)
Armazena dados estruturados principais:

#### Tabelas
- **users** - Usuários do sistema
- **products** - Produtos do cardápio
- **categories** - Categorias de produtos

#### Relacionamentos
- `Product` ➡️ `Category` (N:1)

### MongoDB (Mongoose)
Armazena dados de pedidos para alta performance:

#### Collections
- **orders** - Pedidos dos usuários

### Migrações
Execute as migrações para criar as tabelas:

```bash
pnpm sequelize db:migrate
```

Localização: `src/database/migrations/`

## 📁 Upload de Arquivos

### Configuração
- **Destino**: `/uploads` directory
- **Naming**: UUID + nome original
- **Middleware**: Multer

### Endpoints
- Produtos: `POST/PUT /products` (campo `file`)
- Categorias: `POST/PUT /categories` (campo `file`)

### Acesso
```javascript
// URLs geradas automaticamente
{
  "id": 1,
  "name": "Big Burger",
  "path": "1234-burger.jpg",
  "url": "http://localhost:3001/product-file/1234-burger.jpg"
}
```

## 💳 Pagamentos

### Stripe Integration
```javascript
// POST /create-payment-intent
{
  "products": [
    {
      "id": 1,
      "quantity": 2,
      "price": 25.90
    }
  ]
}

// Resposta
{
  "clientSecret": "pi_3L..._secret_...",
  "dpmCheckerLink": "https://..."
}
```

### Moeda
- **BRL** (Real Brasileiro)
- Valores em centavos (ex: R$ 25,90 = 2590)

## 📂 Estrutura do Projeto

```
dev-burguer-api/
├── 📁 src/
│   ├── app.js                        # Configuração Express
│   ├── server.js                     # Entrada da aplicação  
│   ├── routes.js                     # Definição de rotas
│   ├── 📁 app/
│   │   ├── 📁 controllers/           # Lógica de negócio
│   │   │   ├── UserController.js
│   │   │   ├── SessionController.js
│   │   │   ├── ProductController.js  
│   │   │   ├── CategoryController.js
│   │   │   ├── OrderController.js
│   │   │   └── 📁 stripe/
│   │   ├── 📁 middlewares/           # Middlewares customizados
│   │   │   ├── auth.js              # Verificação JWT
│   │   │   └── admin.js             # Verificação admin
│   │   ├── 📁 models/               # Models Sequelize
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Category.js
│   │   └── 📁 schemas/              # Schemas Mongoose
│   │       └── Order.js
│   ├── 📁 config/                   # Configurações
│   │   ├── auth.js                  # JWT config
│   │   ├── database.cjs             # Sequelize config
│   │   ├── fileRoutes.cjs           # Arquivos estáticos
│   │   └── multer.cjs               # Upload config
│   └── 📁 database/                 # Database setup
│       ├── index.js                 # Inicialização
│       └── 📁 migrations/           # Migrações SQL
├── 📁 uploads/                      # Arquivos enviados
├── 🐳 Dockerfile                    # Container config
├── 📦 package.json                  # Dependências
└── 🔧 biome.json                   # Linter config
```

## 🐳 Docker

### Build da imagem
```bash
docker build -t dev-burguer-api .
```

### Executar container
```bash
docker run -p 3001:3001 dev-burguer-api
```

### Funcionalidades Docker
- ✅ Node.js 20 Alpine (imagem otimizada)
- ✅ Migrations automáticas no startup
- ✅ Exposição da porta 3001

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

### Padrões de Código
- Use **Biome** para linting e formatação
- Siga os padrões ES6+ 
- Escreva commits descritivos
- Mantenha os controllers enxutos
- Valide dados de entrada com Yup

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome](https://github.com/seu-usuario)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!