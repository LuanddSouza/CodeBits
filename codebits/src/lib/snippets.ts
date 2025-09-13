export type Snippet = {
  id: number
  title: string
  language: string
  code: string
  description: string
}

export const snippets: Snippet[] = [
  {
    id: 1,
    title: "Hello World em Python",
    language: "Python",
    code: "print('Hello, World!')",
    description: "Snippet básico em Python"
  },
  {
    id: 2,
    title: "Fetch API em JS",
    language: "JavaScript",
    code: "fetch('/api/data').then(res => res.json()).then(console.log)",
    description: "Exemplo de fetch em JavaScript"
  }
]
