import { createClient, type Client } from "@libsql/client";

let cachedClient: Client | null = null;
let schemaReady: Promise<void> | null = null;

type TursoConfigStatus = {
  url: string;
  authToken: string;
  hasUrl: boolean;
  hasAuthToken: boolean;
};

function getTursoCredentials(): TursoConfigStatus {
  const url = process.env.TURSO_DATABASE_URL?.trim();
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

  return {
    url: url ?? "",
    authToken: authToken ?? "",
    hasUrl: Boolean(url),
    hasAuthToken: Boolean(authToken),
  };
}

export function getTursoConfigStatus() {
  return getTursoCredentials();
}

export function hasTursoConfig() {
  const credentials = getTursoCredentials();
  return credentials.hasUrl && credentials.hasAuthToken;
}

export function getTursoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const credentials = getTursoCredentials();

  if (!credentials.hasUrl || !credentials.hasAuthToken) {
    const missing = [
      !credentials.hasUrl ? "TURSO_DATABASE_URL" : null,
      !credentials.hasAuthToken ? "TURSO_AUTH_TOKEN" : null,
    ]
      .filter(Boolean)
      .join(", ");

    throw new Error(
      `Turso n'est pas configure. Variables manquantes: ${missing}.`,
    );
  }

  cachedClient = createClient({
    url: credentials.url,
    authToken: credentials.authToken,
  });

  return cachedClient;
}

export async function ensureTursoSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const client = getTursoClient();

      await client.execute(`
        CREATE TABLE IF NOT EXISTS portfolio_config (
          id TEXT PRIMARY KEY,
          data TEXT NOT NULL,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
    })();
  }

  await schemaReady;
}
