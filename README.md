# FamHub - Gerenciador Familiar

Um aplicativo web para gerenciamento de rotinas e responsabilidades familiares, desenvolvido como protótipo para a disciplina de Projeto de Interfaces de Usuário (PIU) da UFRN.

## 📱 Sobre o Projeto

O FamHub é um gerenciador geral de núcleo familiar que organiza responsabilidades e rotinas dentro de um grupo familiar, incluindo:

- 🏠 **Dashboard familiar** com visão geral das atividades
- 📅 **Agenda compartilhada** para compromissos médicos, escolares e pessoais
- 💊 **Controle de medicamentos** com lembretes de horários
- ✅ **Lista de tarefas** distribuídas entre os membros
- 🛒 **Lista de compras colaborativa** com comentários

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (vem com o Node.js)

### Instalação

1. Clone ou baixe o projeto para seu computador

2. No terminal, navegue até a pasta do projeto:
```bash
cd famhub
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

5. Abra o navegador e acesse:
```
http://localhost:3000/famhub
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React para desenvolvimento web
- **React 19** - Biblioteca para interfaces de usuário
- **Material-UI (MUI)** - Sistema de design e componentes
- **JavaScript/ES6+** - Linguagem de programação

## 👥 Personas de Teste

O protótipo foi desenvolvido baseado em 3 personas principais:
- **Fabrício Neves** (42 anos) - Pai de família que precisa organizar rotinas
- **Nicole Carvalho** (31 anos) - Gestante que gerencia cuidados da mãe idosa
- **Lucas Vieira** (26 anos) - Filho que ajuda a organizar a família

## 📂 Estrutura do Projeto

```
famhub/
├── src/app/famhub/
│   ├── components/          # Componentes das telas
│   │   ├── HomeScreen.js    # Tela inicial
│   │   ├── CalendarScreen.js # Agenda
│   │   ├── MedicationsScreen.js # Medicamentos
│   │   ├── TasksScreen.js   # Tarefas
│   │   └── ShoppingScreen.js # Lista de compras
│   ├── data/
│   │   └── mockData.js      # Dados de exemplo
│   ├── page.js              # Componente principal
│   └── layout.js            # Layout da aplicação
```

## 🎯 Funcionalidades Implementadas

- ✅ Interface mobile-first responsiva
- ✅ Navegação entre 5 telas principais
- ✅ Dados mockados para demonstração
- ✅ Componentes interativos (checkboxes, botões)
- ✅ Sistema visual de status e progresso
- ✅ Design baseado em Material Design

## 💡 Como Testar

1. Acesse a aplicação em `http://localhost:3000/famhub`
2. Navegue pelas abas no menu inferior
3. Teste as funcionalidades interativas:
   - Marque/desmarque tarefas
   - Marque itens da lista de compras
   - Confirme administração de medicamentos
   - Explore os detalhes dos compromissos

## 📧 Contato

Projeto desenvolvido para PIU - UFRN
Dezembro de 2025

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
