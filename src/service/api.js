import axios from "axios";

// Cria uma instância do axios para fazer requisições HTTP para um servidor com base na URL fornecida.
export const api = axios.create({
  baseURL: "http://localhost:3000",
});
