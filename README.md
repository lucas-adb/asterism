# ✨ Asterism

Uma aplicação para organizar e gerenciar seus links favoritos da internet. Construída com **React**, **TypeScript**, **TailwindCSS** e **React Query**.

## 🌟 Sobre o Projeto

Asterism é um bookmark manager intuitivo que permite:

- ✅ **Autenticação segura** com JWT e refresh tokens
- ✅ **Organização por categorias** (Sites, Tutoriais, Artigos, Inspirações, Ferramentas)
- ✅ **Sistema de tags** personalizáveis
- ✅ **Busca em tempo real** com debounce
- ✅ **Paginação** eficiente
- ✅ **Interface responsiva** e acessível
- ✅ **Tema claro/escuro** adaptável
- ✅ **Experiência offline-first** com cache inteligente

## 🎨 Preview

```
🏠 Home Page → Apresentação e navegação
🔐 Login/Signup → Autenticação segura
⭐ Favorites → Gerenciamento completo de favoritos
🔍 Search & Filter → Busca avançada com filtros
📱 Responsive → Funciona em todos os dispositivos
```

## 🚀 Tecnologias

| **Categoria**  | **Tecnologia**  | **Descrição**                    |
| -------------- | --------------- | -------------------------------- |
| **Core**       | React 19        | Library para interfaces          |
| **Language**   | TypeScript      | Tipagem estática                 |
| **Styling**    | TailwindCSS     | Framework CSS utilitário         |
| **State**      | React Query     | Gerenciamento de estado servidor |
| **Forms**      | React Hook Form | Formulários performáticos        |
| **Validation** | Zod             | Validação de schemas             |
| **Router**     | React Router 7  | Roteamento SPA                   |
| **HTTP**       | Axios           | Cliente HTTP com interceptors    |
| **UI**         | shadcn/ui       | Componentes acessíveis           |
| **Icons**      | Phosphor Icons  | Ícones modernos                  |
| **Build**      | Vite            | Build tool otimizado             |

## 🔧 Configuração

### Pré-requisitos

- Node.js 18+
- npm/yarn/pnpm
- Backend Asterism rodando

## 🎯 Funcionalidades

### 🔐 **Autenticação**

- Login/Signup com validação
- JWT tokens com refresh automático
- Logout seguro
- Persistência de sessão

### ⭐ **Gerenciamento de Favoritos**

- Adicionar favoritos com formulário intuitivo
- Editar informações inline
- Excluir com confirmação
- Categorização por tipos
- Sistema de tags flexível

### 🔍 **Busca e Filtros**

- Busca em tempo real com debounce (500ms)
- Filtro por categoria
- Paginação eficiente
- Ordenação personalizada

### 🎨 **Interface**

- Design responsivo mobile-first
- Tema claro/escuro com persistência
- Animações suaves com CSS
- Feedback visual para ações
- Loading states consistentes

## 🔄 Estado da Aplicação

### React Query

- Cache inteligente de dados
- Sincronização automática
- Mutações otimistas
- Background refetch

### Context API

- AuthProvider → Estado de autenticação
- ThemeProvider → Tema claro/escuro

## 📈 Próximos Passos

- [ ] Filtro de tags
- [ ] Upload de imagens para favoritos
- [ ] Extensão para navegadores

## 📄 Licença

MIT License - veja LICENSE para detalhes.

---

**Desenvolvido por [Lucas Alves](https://github.com/lucas-adb)**

_Capture as estrelas da web. Organize-as em sua própria galáxia._ ✨
