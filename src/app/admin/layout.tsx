import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Admin Suite | The Window Doctor",
  description: "Enterprise content management and telemetry backoffice suite for The Window Doctor.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
