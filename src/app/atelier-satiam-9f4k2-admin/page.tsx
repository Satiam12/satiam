import { AdminEditor } from "@/components/admin-editor";
import { getPortfolioConfig } from "@/lib/portfolio";

export const metadata = {
  title: "Admin | satiam",
  description: "Edition du portfolio satiam",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const config = await getPortfolioConfig();

  return <AdminEditor currentPage="overview" initialConfig={config} />;
}
