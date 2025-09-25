export type Snippet = {
  id: string
  title: string
  language: string
  code: string
  description: string
  visibility: "public" | "private"
  created_at: string
}
