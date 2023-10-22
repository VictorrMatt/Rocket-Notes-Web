import axios from "axios";

// Cria uma instância do axios para fazer requisições HTTP para um servidor com base na URL fornecida.
export const api = axios.create({
  baseURL: "https://rocketnotes-api-f2hg.onrender.com",
});
