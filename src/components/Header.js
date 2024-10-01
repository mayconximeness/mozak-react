import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  padding: 20px 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Navbar = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>morena.</Logo>
      <Navbar>
        <NavItem href="#">Criar evento</NavItem>
        <NavItem href="#">Entrar</NavItem>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
