// src/app/api/image-comments/route.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET: Obtener comentarios de una imagen específica
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return Response.json({ error: "imageId es requerido" }, { status: 400 });
    }

    const { data: comments, error } = await supabase
      .from("image_comments")
      .select("*")
      .eq("image_id", parseInt(imageId))
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
      return Response.json(
        { error: "Error al obtener comentarios" },
        { status: 500 }
      );
    }

    return Response.json({ comments: comments || [] });
  } catch (error) {
    console.error("Error in GET /api/image-comments:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST: Agregar nuevo comentario
export async function POST(request) {
  try {
    const body = await request.json();
    const { imageId, authorName, commentText } = body;

    // Validaciones
    if (!imageId || !authorName || !commentText) {
      return Response.json(
        { error: "imageId, authorName y commentText son requeridos" },
        { status: 400 }
      );
    }

    if (authorName.length > 100) {
      return Response.json(
        { error: "El nombre no puede exceder 100 caracteres" },
        { status: 400 }
      );
    }

    if (commentText.length > 1000) {
      return Response.json(
        { error: "El comentario no puede exceder 1000 caracteres" },
        { status: 400 }
      );
    }

    const { data: comment, error } = await supabase
      .from("image_comments")
      .insert([
        {
          image_id: parseInt(imageId),
          author_name: authorName.trim(),
          comment_text: commentText.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting comment:", error);
      return Response.json(
        { error: "Error al guardar comentario" },
        { status: 500 }
      );
    }

    return Response.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/image-comments:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
