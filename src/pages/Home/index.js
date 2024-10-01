import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 25px 0;
  background-color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavItem = styled.a`
  margin-left: 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    color: #333;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 2rem;
  font-weight: bold;
`;

const Container = styled.div`
  padding-top: 80px; /* Espaço para a navbar */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 30px 0;
  color: #333;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 80%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Para telas menores, os eventos ficam em uma coluna */
  }
`;

const EventCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const EventDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const EventTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const EventLocation = styled.p`
  font-size: 1rem;
  color: #999;
`;

const Home = () => {
  return (
    <>
      <Navbar>
        <Logo>morena.</Logo>
        <NavItem as={Link} to="/">Criar evento</NavItem>
        <NavItem as={Link} to="/signin">Entrar</NavItem>
      </Navbar>

      <Container>
        <Title>Eventos da morena.</Title>
        <EventsGrid>
          {/* Card de exemplo - adicione mais conforme necessário */}
          <EventCard>
            <EventDate>05 de Outubro, 2024</EventDate>
            <EventTitle>JOTA25 em São José dos Campos</EventTitle>
            <EventLocation>Farma Conde Arena - São José dos Campos</EventLocation>
          </EventCard>
          <EventCard>
            <EventDate>05 de Outubro, 2024</EventDate>
            <EventTitle>JOTA25 em São José dos Campos</EventTitle>
            <EventLocation>Farma Conde Arena - São José dos Campos</EventLocation>
          </EventCard>
          <EventCard>
            <EventDate>05 de Outubro, 2024</EventDate>
            <EventTitle>JOTA25 em São José dos Campos</EventTitle>
            <EventLocation>Farma Conde Arena - São José dos Campos</EventLocation>
          </EventCard>
          <EventCard>
            <EventDate>05 de Outubro, 2024</EventDate>
            <EventTitle>JOTA25 em São José dos Campos</EventTitle>
            <EventLocation>Farma Conde Arena - São José dos Campos</EventLocation>
          </EventCard>
          <EventCard>
            <EventDate>05 de Outubro, 2024</EventDate>
            <EventTitle>JOTA25 em São José dos Campos</EventTitle>
            <EventLocation>Farma Conde Arena - São José dos Campos</EventLocation>
          </EventCard>
          <EventCard>
            <EventDate>05 de Outubro, 2024</EventDate>
            <EventTitle>JOTA25 em São José dos Campos</EventTitle>
            <EventLocation>Farma Conde Arena - São José dos Campos</EventLocation>
          </EventCard>
        </EventsGrid>
      </Container>
    </>
  );
}

export default Home;
