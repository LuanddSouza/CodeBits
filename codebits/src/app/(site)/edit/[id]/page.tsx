import { supabase } from "../../lib/supabaseClient";
import SnippetForm from "../../components/SnippetForm";

export default async function EditSnippetPage({ params }) {
  const { id } = params;

  const { data } = await supabase
    .from("snippets")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Editar Snippet</h1>

      <SnippetForm initialData={data} mode="edit" />
      
    </div>
  );
}