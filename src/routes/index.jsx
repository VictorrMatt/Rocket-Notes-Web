import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  // Obtém o contexto de autenticação usando o hook useAuth.
  const { user } = useAuth();

  // O componente Routes decide qual conjunto de rotas exibir com base na autenticação do usuário.
  return (
    <BrowserRouter>
      {/* Se um usuário estiver autenticado (user não é nulo), exibe as rotas de aplicativo (AppRoutes). */}
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}
