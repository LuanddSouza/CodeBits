# 🚀 CodeBits

> **CodeBits** é uma aplicação moderna desenvolvida com **Next.js**, pensada para ser sua **biblioteca pessoal de snippets de código**.  
Organize, visualize, copie e compartilhe pequenos trechos de código de forma prática e intuitiva.

---

## 📸 Demonstrações

![Minhas Snippets](/imagens/image.png)
![Snippets Publicas](/imagens/image.png)

- Página de Login  
- Tela de Registro  
- Lista com snippets  
- Visualização individual de snippet  

---

## 🧠 Sobre o Projeto

O **CodeBits** nasceu com a ideia de ser um "repositório pessoal de sabedoria em código" —  
um local onde desenvolvedores possam salvar suas soluções favoritas em diferentes linguagens,  
com organização, sintaxe colorida e uma experiência fluida.

---

## 🏗️ Tecnologias Utilizadas

| Categoria | Tecnologia |
|------------|-------------|
| **Frontend** | [Next.js (App Router)](https://nextjs.org/) |
| **Estilização** | [Tailwind CSS](https://tailwindcss.com/) |
| **Banco de Dados** | [Supabase](https://supabase.com/) |
| **Syntax Highlight** | [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) |
| **Ícones** | [Lucide React](https://lucide.dev/) |
| **Alertas e Toasts** | [SweetAlert2](https://sweetalert2.github.io/) + [react-hot-toast](https://react-hot-toast.com/) |

---

## ⚙️ Funcionalidades

✅ Autenticação de usuários (login / registro)  
✅ Cada usuário visualiza **somente seus snippets**  
✅ Criação, exclusão e listagem de snippets  
✅ Copiar código com um clique (Clipboard API)  
✅ Syntax highlight automático conforme a linguagem  
✅ Interface moderna e responsiva  
✅ Feedback visual com *toasts* e *pop-ups*

---

## 🧩 Estrutura de Pastas

```
app/
 ├─ (site)/          → layout principal (com Header e páginas autenticadas)
 │   ├─ page.tsx
 |   └─components/ → componentes reutilizáveis (SnippetCard, Header etc.)
 |   └─api/
 |   └─cadastrar/
 |   └─lib/
 |   └─publicas/
 |
 ├─ (auth)/          → rotas de autenticação (isoladas do layout principal)
 │   ├─ login/
 │   └─ registrar/
 |   └─ layout.tsx
 ├     
 ├─ globals.css      → estilos globais (Tailwind)
```

---

## 💾 Configuração e Execução

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/LuanddSouza/CodeBits.git
cd codebits
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar o Supabase
Crie um projeto no [Supabase](https://supabase.com/) e adicione suas variáveis no arquivo `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 4️⃣ Rodar o projeto
```bash
npm run dev
```

Acesse:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 💡 Boas Práticas

- Use o `localhost` (ou HTTPS) para testar a função de **copiar snippet**  
- Organize seus snippets por linguagem para aproveitar o highlight automático  
- Utilize o **Supabase Auth** para segurança e isolamento dos dados

---

## 📱 Acesso em Outros Dispositivos

Quer testar no celular?  
Use o **LocalTunnel** (ou **Ngrok**) pra gerar uma URL HTTPS válida:

```bash
npx localtunnel --port 3000
```

---

## 🧑‍💻 Autor

**Luan de Souza**  
Desenvolvedor do projeto **CodeBits** ⚡  
> *"Guardar conhecimento é bom, mas compartilhar snippets é melhor ainda!"*

📎 [LinkedIn](www.linkedin.com/in/luanddsouza)  
📎 [GitHub](https://github.com/LuanddSouza)

---

## 📄 Licença

Este projeto é licenciado sob a [MIT License](LICENSE).