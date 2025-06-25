import { NavLink } from "react-router";
import styled from "styled-components";

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Title = styled.h1`
  font-family: "Comic Sans MS", "Marker Felt", fantasy;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  margin: 0;
  transform: rotate(-5deg);
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const StyledNavLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    font-weight: bold;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

function Headers({ title }) {
  return (
    <Header>
      <Title>{title}</Title>
      <Nav>
        <StyledNavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </StyledNavLink>
        <StyledNavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </StyledNavLink>
      </Nav>
    </Header>
  );
}

export default Headers;
