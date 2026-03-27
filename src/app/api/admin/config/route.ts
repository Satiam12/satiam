import { NextResponse } from "next/server";

import { savePortfolioConfig, type PortfolioConfig } from "@/lib/portfolio";

export async function PUT(request: Request) {
  try {
    const config = (await request.json()) as PortfolioConfig;
    const savedConfig = await savePortfolioConfig(config);

    return NextResponse.json({ config: savedConfig });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inconnue pendant la sauvegarde.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
