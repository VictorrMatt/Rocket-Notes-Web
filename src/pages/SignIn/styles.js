import styled from "styled-components";
import backgroundImg from "../../assets/background.png";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Form = styled.div`
  padding: 0 136px;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  > h1 {
    font-size: 48px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > h2 {
    font-size: 24px;
    margin: 48px;
  }

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  > a {
    margin-top: 124px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;

export const Background = styled.div`
  flex: 1;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: opacity(0.2);
`;
