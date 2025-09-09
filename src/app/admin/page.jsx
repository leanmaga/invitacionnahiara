import AdminDashboard from "@/components/dashboard/AdminDashboard";

// Variable de entorno para el nombre de la quinceañera
const nombreQuinceanera =
  process.env.NEXT_PUBLIC_NOMBRE_QUINCEANERA || "Quinceañera";

export default function AdminPage() {
  return <AdminDashboard />;
}

export const metadata = {
  title: `Panel de Administración - ${nombreQuinceanera}`,
  description: "Dashboard para gestionar confirmaciones de asistencia",
  robots: "noindex, nofollow", // Evita que Google indexe esta página
};
