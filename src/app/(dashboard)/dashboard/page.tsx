import { auth } from "@/lib/auth";
import { OnboardSection } from "@/module/dashboard/ui/section/onboard-section";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
      <OnboardSection />
  );
}
