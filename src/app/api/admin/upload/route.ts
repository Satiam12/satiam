import { NextResponse } from "next/server";

import {
  getSupabaseServerClient,
  isSupabaseConfigured,
  portfolioMediaBucket,
} from "@/lib/portfolio";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase n'est pas configure pour les uploads." },
      { status: 500 },
    );
  }

  const fileName = `${Date.now()}-${sanitizeFileName(file.name)}`;
  const filePath = `portfolio/${fileName}`;
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Client Supabase indisponible." },
      { status: 500 },
    );
  }

  const { error } = await supabase.storage
    .from(portfolioMediaBucket)
    .upload(filePath, Buffer.from(await file.arrayBuffer()), {
      contentType: file.type || undefined,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage
    .from(portfolioMediaBucket)
    .getPublicUrl(filePath);

  return NextResponse.json({ url: data.publicUrl });
}
