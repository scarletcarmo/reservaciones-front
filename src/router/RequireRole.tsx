import { Navigate } from "react-router-dom";

interface AuthProviderProps {
  role: "customer" | "owner";
  children: React.ReactNode;
}

export default function RequireRole({ role, children }: AuthProviderProps) {
  const user = JSON.parse(localStorage.getItem("user") || "null"); //obtener al usuario
  console.log("role--->", user.role);
  
  if (!user) return <Navigate to="/login" replace />; //Si no hay usuario, se redirige al login.
  if (user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;

  return <>{children}</>;
}
