import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";
import { Routes } from "./routes";
import { AuthProvider } from "./hooks/auth";

// O código a seguir é responsável por renderizar o aplicativo na página web.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* O ThemeProvider é usado para fornecer estilos temáticos aos componentes.
       Neste caso, o tema é importado do arquivo theme.js e aplicado a todos os componentes dentro dele. */}
    <ThemeProvider theme={theme}>
      {/* O GlobalStyles contém estilos globais para a aplicação, como definições de fontes e estilos básicos. */}
      <GlobalStyles />
      {/* O AuthProvider é um componente que fornece informações de autenticação para a aplicação.
         Ele envolve todos os componentes dentro dele, para que essas informações de autenticação
         estejam disponíveis para toda a aplicação. */}
      <AuthProvider>
        {/* As rotas da aplicação são definidas no componente Routes e são renderizadas aqui. */}
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
