/* O código implementa um sistema de autenticação em uma aplicação React. 
Ele utiliza um contexto de autenticação para fornecer informações 
relacionadas à autenticação para outros componentes da aplicação. 
O contexto é fornecido pelo componente AuthProvider, que gerencia funções 
de autenticação, como fazer login, fazer logout e atualizar o perfil do 
usuário. Ele também verifica se o usuário está autenticado ao iniciar a 
aplicação. O hook personalizado useAuth permite que outros componentes 
acessem as informações de autenticação. Em resumo, o código trata da 
autenticação do usuário, armazenando tokens e informações do usuário, 
interagindo com uma API e fornecendo funcionalidades de autenticação 
para toda a aplicação. */

// Importando bibliotecas e módulos necessários para a autenticação.
import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../service/api";

// Criando um contexto de autenticação que fornecerá informações relacionadas à autenticação para outros componentes.
const AuthContext = createContext({});

// O AuthProvider é um componente que fornece o contexto de autenticação e gerencia a autenticação do usuário.
function AuthProvider({ children }) {
  const [data, setData] = useState({});

  // Função para autenticar o usuário e armazenar o token e informações do usuário.
  async function signIn({ email, password }) {
    try {
      // Extrai o token e informações do usuário da resposta.
      const response = await api.post("/sessions", { email, password });

      // Extrai o token e informações do usuário da resposta.
      const { user, token } = response.data;

      // Armazena o token e informações do usuário no armazenamento local.
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      // Configura o token no cabeçalho das solicitações da API.
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Atualiza o estado local com as informações do usuário e o token.
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        // Exibe uma mensagem de erro se a autenticação falhar.
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  // Função para fazer logout do usuário.
  function signOut() {
    // Remove o usuário e o token do armazenamento local.
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");

    // Limpa os dados de autenticação do estado local.
    setData({});
  }

  // Função para atualizar o perfil do usuário.
  async function updateProfile({ user, avatarFile }) {
    try {
      // Faz a atualização do perfil, incluindo o avatar, se fornecido.
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }
      await api.put("/users", user);
      // Atualiza as informações do usuário no estado local.
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      setData({ user, token: data.token });

      alert("perfil atualizado com sucesso!");
    } catch (error) {
      // Trata erros se a atualização do perfil falhar.
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  // Verifica se o usuário está autenticado quando o componente é montado.
  useEffect(() => {
    // Verifica o armazenamento local para obter o token e as informações do usuário.
    // Se encontrados, configura o token nas solicitações da API e atualiza o estado local.
    const user = localStorage.getItem("@rocketnotes:user");
    const token = localStorage.getItem("@rocketnotes:token");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  // Fornece o contexto de autenticação para os componentes filhos.
  return (
    <AuthContext.Provider
      value={{ signIn, user: data.user, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto de autenticação.
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
