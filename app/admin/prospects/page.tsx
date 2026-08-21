import { getProspects } from "@/lib/admin/get-prospects";
import { ProspectsTable } from "@/components/admin/ProspectsTable";

export default async function AdminProspectsPage() {
  const prospects = await getProspects();

  return <ProspectsTable prospects={prospects} />;
}
