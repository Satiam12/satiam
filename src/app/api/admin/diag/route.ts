import { NextResponse } from "next/server";

import { getTursoConfigStatus } from "@/lib/turso";

export async function GET() {
  const turso = getTursoConfigStatus();

  return NextResponse.json({
    ok: true,
    runtime: {
      vercel: Boolean(process.env.VERCEL),
      env: process.env.VERCEL_ENV ?? null,
      region: process.env.VERCEL_REGION ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
    turso: {
      hasDatabaseUrl: turso.hasUrl,
      hasAuthToken: turso.hasAuthToken,
      databaseUrlPreview: turso.hasUrl
        ? `${turso.url.slice(0, 20)}...`
        : null,
      authTokenPreview: turso.hasAuthToken ? `${turso.authToken.slice(0, 12)}...` : null,
    },
  });
}
