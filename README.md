# 🎥 Projeto Back-end de Streaming de Vídeos

> Sistema back-end para gerenciamento de vídeos, feito com foco em aprendizado e boas práticas em **Node.js** e **MongoDB**.  
> Implementa operações CRUD para vídeos, com interface via terminal e estrutura modular para futura integração com frameworks como Express.

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seuusuario/projetoback.git
   cd projetoback
Instale as dependências:

bash
Copiar
Editar
npm install
Configure o MongoDB:

Certifique-se de que o MongoDB esteja rodando localmente (padrão: mongodb://localhost:27017) ou ajuste a conexão no arquivo src/db.js.

Execute o projeto:

bash
Copiar
Editar
node app.js
Interaja com o menu via terminal para inserir, buscar, listar e deletar vídeos.

🧰 Tecnologias e Estrutura
Node.js — Ambiente de execução JavaScript moderno

MongoDB — Banco de dados NoSQL flexível e escalável

JavaScript (ES Modules) — Código modular e organizado

readline — Interface de entrada e saída no terminal

Arquitetura modular — Separação clara entre:

src/video.js — Modelagem e operações de Vídeo

src/db.js — Configuração da conexão com MongoDB

app.js — Interface CLI e fluxo do programa

Logs de erros salvos na pasta logs/ para monitoramento

💡 Funcionalidades
Inserir vídeos com título, descrição, URL e duração

Buscar vídeos por título com busca parcial

Listar todos os vídeos cadastrados

Deletar vídeos por ID do MongoDB

Inserção em lote de vídeos de exemplo para testes rápidos

Tratamento de erros com logs persistidos em arquivo

📋 Exemplo de uso no terminal
bash
Copiar
Editar
=== Streaming Vídeos - Menu ===
1. Inserir novo vídeo
2. Buscar vídeo por título
3. Listar todos os vídeos
4. Deletar vídeo por ID
5. Inserir lista de vídeos
6. Sair
Escolha uma opção: 1

Título: Curso Node.js
Descrição (opcional): Aprenda backend com Node
URL: https://youtube.com/nodejs
Duração (segundos): 600

Vídeo inserido com sucesso! ID: 645d5c3a18f4b92d4b2f1234
🗂️ Estrutura do projeto
bash
Copiar
Editar
projetoback/
│
├── src/
│   ├── video.js       # Classe Video com métodos CRUD
│   ├── db.js          # Configuração do MongoDB
│   └── logger.js      # Registro de logs de erros
│
├── logs/              # Arquivos de log de erros
├── app.js             # Interface CLI e fluxo principal
├── package.json       # Dependências e scripts
└── README.md          # Documentação do projeto
🤝 Próximos passos
Implementar API REST com Express para acesso via HTTP

Adicionar autenticação e autorização

Melhorar interface CLI com menus mais interativos

Implementar testes automatizados (Jest/Mocha)

Implementar upload de vídeos e armazenamento real (S3, etc.)

👤 Autor
Kauan Pedreira
Estudante de Programação Web Back-end
LinkedIn | GitHub
