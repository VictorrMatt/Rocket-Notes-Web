import { RiShutDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { api } from "../../service/api";

import avatarPlaceholder from "../../assets/avatar.svg";

import { Container, Profile, Logout } from "./styles";

export function Header() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    navigate(-1);
    signOut();
  }

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt={`Imagem de ${user.name}.`} />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
