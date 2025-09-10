# Rick and Morty App

Este projeto é uma aplicação web construída com Angular para explorar os fundamentos do framework. Ele simula uma plataforma onde usuários podem se cadastrar, fazer login e navegar por uma lista paginada de personagens da série "Rick and Morty", com a funcionalidade de favoritar seus personagens preferidos.

O principal objetivo do projeto foi solidificar os conhecimentos básicos do Angular e de conceitos de desenvolvimento front-end moderno.

## 💻 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- **Front-end Framework:** Angular v15.2.0
- **Linguagem:** TypeScript v4.9.4
- **Gerenciador de Pacotes:** npm
- **Estilização:** Bootstrap v5.3.3 e Bootstrap Icons
- **Programação Assíncrona:** RxJS v7.8.0

## ✨ Funcionalidades

O projeto abrange uma variedade de conceitos essenciais do Angular, incluindo:

- **Autenticação e Roteamento:** Telas de login e cadastro com um sistema de autenticação simples.
- **Validação de Formulários:** Uso de Reactive Forms e validadores personalizados para garantir a integridade dos dados de usuário.
- **Guards de Roteamento:** Proteção de rotas privadas para que apenas usuários autenticados possam acessar a página principal.
- **Comunicação com APIs:** Consumo de APIs externas para obter dados de usuários e personagens.
  - **Autenticação:** [MockAPI](https://mockapi.io/)
  - **Dados dos Personagens:** [The Rick and Morty API](https://rickandmortyapi.com/)
- **Gerenciamento de Estado:** Uso de Services e Observables (RxJS) para gerenciar o estado do usuário (sessão) e o estado da aplicação (favoritos e alertas).
- **Estrutura da Aplicação:** Criação e organização de componentes, serviços, e modelos (models).
- **UI/UX:** Implementação de uma interface moderna e responsiva com Bootstrap e Bootstrap Icons, incluindo um layout de carrossel e paginação para a lista de personagens.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para ter uma cópia do projeto em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Certifique-se de que você tem o **Node.js** (versão 18.x ou superior) e o **Angular CLI** instalados globalmente.

- Instale o Node.js em: [https://nodejs.org/](https://nodejs.org/)
- Após instalar o Node.js, instale o Angular CLI globalmente com o comando abaixo:
  ```bash
  npm install -g @angular/cli
  ```

### Instalação e Execução

1. Clone o repositório:
```bash
git clone [https://github.com/mateuszebendo/angular-rick-and-morty.git](https://github.com/mateuszebendo/angular-rick-and-morty.git)
```

2. Acesse o diretório do projeto:
```bash
cd angular-rick-and-morty
```

3. Instale as dependências:
```bash
npm install
```

4.Inicie o servidor de desenvolvimento:
```bash
ng serve    
```