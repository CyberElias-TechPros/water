import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "AQUARIS demonstration administration workspace.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section style={{ paddingTop: "calc(var(--header-h) + clamp(28px, 4vw, 46px))", paddingBottom: "clamp(40px, 6vw, 70px)" }}>
      <div className="container">
        <AdminDashboard />
      </div>
    </section>
  );
}
