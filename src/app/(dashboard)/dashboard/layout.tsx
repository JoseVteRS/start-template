import { Navbar } from "@/module/dashboard/ui/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
