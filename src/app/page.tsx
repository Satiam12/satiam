import { PortfolioView } from "@/components/portfolio-view";
import { getPortfolioConfig } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const config = await getPortfolioConfig();

  return <PortfolioView config={config} />;
}
