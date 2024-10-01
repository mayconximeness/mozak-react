import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Estilos baseados na imagem
const Container = styled.div`
  padding-top: 80px; /* Espaço para a navbar */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

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

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  p {
    font-size: 1rem;
    color: #555;
  }
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;

  &:hover {
    background-color: #333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

// Componente principal
const EventDetails = () => {
  const { uuid } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  const storedToken = JSON.parse(localStorage.getItem('user_token'));

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/uuid/${uuid}`, {
          headers: {
            Authorization: `Bearer ${storedToken.token}`,
          },
        });

        setEvent(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do evento:', error);
        setError('Não foi possível carregar os detalhes do evento.');
      }
    };

    fetchEventDetails();
  }, [uuid, storedToken]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!event) {
    return <p>Carregando...</p>;
  }

  return (
     <>
          <Navbar>
               <Logo>morena.</Logo>
               <NavItem as={Link} to="/">Criar evento</NavItem>
               <NavItem as={Link} to="/signin">Entrar</NavItem>
          </Navbar>
          <Container>
               <Header>{event.name}</Header>
               <EventInfo>
               <InfoIcon>📅</InfoIcon>
               <p>Data: {new Date(event.starts_at).toLocaleDateString()} • {new Date(event.ends_at).toLocaleDateString()}</p>
               </EventInfo>
               <EventInfo>
               <InfoIcon>📍</InfoIcon>
               <p>Local: {event.address}, {event.city} - {event.state}</p>
               </EventInfo>
          <Description>{event.description}</Description>
          <Button>Inscrever</Button>
     </Container>
    </>
  );
};

export default EventDetails;
