import { supabase } from "../lib/supabaseClient";

export async function deleteSnippet(id: string) {
  const { error } = await supabase.from("snippets").delete().eq("id", id);

  if (error) {
    console.error("Erro ao deletar snippet:", error.message);
    throw new Error(error.message);
  }
}
