# 🎥 Projeto Back-end de Streaming de Vídeos

> Sistema back-end para gerenciamento de vídeos, focado no aprendizado e na aplicação de boas práticas em **Node.js** e **MongoDB**.
> Implementa operações CRUD (Create, Read, Update, Delete) para vídeos, com uma interface de linha de comando (CLI) e uma estrutura modular, preparada para futura integração com frameworks como o Express.js.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    cd nome-do-repositorio
    ```
    *(Lembre-se de substituir `seu-usuario/nome-do-repositorio` pelo URL real do seu repositório)*

2.  **Instale as Dependências:**
    Navegue até a pasta do projeto e execute o comando abaixo para instalar todas as dependências listadas no arquivo `package.json`.
    ```bash
    npm install
    ```

3.  **Configure o MongoDB:**
    * Certifique-se de que você tem uma instância do MongoDB rodando localmente. A string de conexão padrão utilizada pelo projeto é `mongodb://localhost:27017/nome-do-banco`.
    * Caso sua configuração seja diferente, ajuste a string de conexão no arquivo `src/db.js`.

4.  **Execute o Projeto:**
    Após a instalação das dependências e configuração do banco de dados, inicie a aplicação com o comando:
    ```bash
    node app.js
    ```

5.  **Interaja com o Menu:**
    Utilize o menu interativo no terminal para realizar as operações de inserir, buscar, listar e deletar vídeos.

---

## 🧰 Tecnologias e Estrutura

Este projeto foi construído utilizando as seguintes tecnologias e conceitos:

* **Node.js:** Ambiente de execução JavaScript server-side.
* **MongoDB:** Banco de dados NoSQL orientado a documentos, conhecido por sua flexibilidade e escalabilidade.
* **JavaScript (ES Modules):** Utilização da sintaxe moderna do JavaScript para um código mais modular e organizado.
* **`readline`:** Módulo nativo do Node.js para criar interfaces de linha de comando interativas.
* **Arquitetura Modular:** O código é organizado de forma a separar responsabilidades:
    * `src/video.js`: Contém a modelagem da entidade `Video` e as operações CRUD relacionadas.
    * `src/db.js`: Responsável pela configuração e estabelecimento da conexão com o MongoDB.
    * `app.js`: Ponto de entrada da aplicação, responsável pela interface CLI e orquestração do fluxo do programa.
* **Logging:** Erros são registrados em arquivos na pasta `logs/` para facilitar o monitoramento e a depuração.

---

## 💡 Funcionalidades

* **Inserir Vídeos:** Adicionar novos vídeos fornecendo título, descrição (opcional), URL e duração em segundos.
* **Buscar Vídeos por Título:** Realizar buscas parciais por vídeos utilizando seus títulos.
* **Listar Todos os Vídeos:** Visualizar uma lista completa de todos os vídeos cadastrados no sistema.
* **Deletar Vídeos por ID:** Remover vídeos específicos utilizando o ID único gerado pelo MongoDB.
* **Inserção em Lote:** Funcionalidade para adicionar uma lista pré-definida de vídeos de exemplo, agilizando testes.
* **Tratamento de Erros:** Captura e registro de erros em arquivos de log para análise posterior.

---

## 📋 Exemplo de Uso no Terminal

Veja um exemplo de interação com o menu da aplicação:

```bash
=== Streaming Vídeos - Menu ===
1. Inserir novo vídeo
2. Buscar vídeo por título
3. Listar todos os vídeos
4. Deletar vídeo por ID
5. Inserir lista de vídeos
6. Sair
Escolha uma opção: 1

Título: Curso Completo de Node.js
Descrição (opcional): Aprenda a desenvolver aplicações backend robustas com Node.js e Express.
URL: [https://www.youtube.com/watch?v=videoIDexample](https://www.youtube.com/watch?v=videoIDexample)
Duração (segundos): 3600

Vídeo inserido com sucesso! ID: 645d5c3a18f4b92d4b2f123a
```

---

## 🗂️ Estrutura do Projeto

A organização das pastas e arquivos do projeto é a seguinte:

```
projetoback/
│
├── src/
│   ├── video.js        # Lógica e modelo para a entidade Vídeo (operações CRUD)
│   ├── db.js           # Configuração e conexão com o banco de dados MongoDB
│   └── logger.js       # Módulo para registro de logs de erros
│
├── logs/               # Pasta para armazenamento dos arquivos de log de erros
│
├── app.js              # Ponto de entrada da aplicação, interface CLI e fluxo principal
├── package.json        # Metadados do projeto, dependências e scripts NPM
├── package-lock.json   # Registro exato das versões das dependências
└── README.md           # Documentação do projeto (este arquivo)
```

---

## 🤝 Próximos Passos e Melhorias Futuras

Este projeto é um ponto de partida. Algumas ideias para evoluções futuras incluem:

* [ ] **Implementar API REST:** Desenvolver uma API REST utilizando Express.js para permitir interações via HTTP.
* [ ] **Adicionar Autenticação e Autorização:** Implementar mecanismos de segurança para proteger os endpoints da API.
* [ ] **Melhorar Interface CLI:** Utilizar bibliotecas como `inquirer.js` para criar menus mais interativos e amigáveis.
* [ ] **Testes Automatizados:** Adicionar testes unitários e de integração utilizando frameworks como Jest ou Mocha.
* [ ] **Upload de Vídeos:** Implementar a funcionalidade de upload de arquivos de vídeo e armazenamento em serviços como AWS S3.
* [ ] **Paginação:** Adicionar paginação na listagem de vídeos, especialmente para grandes volumes de dados.
* [ ] **Validação de Dados:** Implementar validações mais robustas para os dados de entrada.

---

## 👤 Autor

**Kauan Pedreira**
*Estudante de Programação Web Back-end*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/seu-linkedin/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-github/)

*(Substitua `https://www.linkedin.com/in/seu-linkedin/` e `https://github.com/seu-github/` pelos seus links reais)*
