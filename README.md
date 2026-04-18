Task Manager API

REST API para gerenciamento de tarefas desenvolvida com Node.js, TypeScript, Express, Prisma ORM e PostgreSQL.

Este projeto permite o cadastro de usuários e gerenciamento de tarefas com prioridade, status e prazo de entrega.

-Tecnologias utilizadas:

Node.js
TypeScript
Express
Prisma ORM
PostgreSQL
Zod

- Funcionalidades:

Usuários
Criar usuário
Listar usuários
Buscar usuário por ID
Atualizar usuário
Remover usuário
Tarefas
Criar tarefa vinculada a um usuário
Listar tarefas
Buscar tarefa por ID
Atualizar tarefa
Remover tarefa
Marcar como concluída ou pendente
Definir prioridade:
HIGH
LOW
Definir prazo de entrega

📁 Estrutura do projeto
src/
 ├── controllers/
 ├── database/
 ├── repositories/
 ├── routes/
 ├── schemas/
 └── index.ts

Instalação:

Clone o repositório:

git clone https://github.com/seu-usuario/task-manager-api.git

Entre na pasta:

cd task-manager-api

Instale as dependências:

npm install
🔐 Variáveis de ambiente

Crie um arquivo .env na raiz:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
🗄️ Banco de dados

Execute as migrations:

npx prisma migrate dev

Gerar client Prisma:

npx prisma generate
▶️ Executar projeto

Modo desenvolvimento:

npm run dev

Servidor rodando em:

http://localhost:3000
📮 Rotas principais
Usuários
POST   /users
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
Tarefas
POST   /tasks
GET    /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id

🧪 Testes de API:

As requisições foram testadas utilizando Insomnia.

Aprendizados aplicados:
CRUD completo com API REST
Relacionamento entre tabelas
Organização em padrão MVC
Validação com Zod
Integração com banco relacional
Versionamento com Git
🚀 Melhorias futuras
Frontend com React
Filtros de tarefas
Dashboard visual
Autenticação JWT
Deploy online
👨‍💻 Autor

João Pedro