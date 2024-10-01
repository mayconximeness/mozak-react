import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsivo */
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

const Evento = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); 

  const storedToken = JSON.parse(localStorage.getItem('user_token'));
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/my-events', {
          headers: {
            Authorization: `Bearer ${storedToken.token}`, 
          },
        });
        setEvents(response.data.data); 
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (uuid) => {
    
    navigate(`/event-details/${uuid}`);
  };

  return (
    <>
      <Navbar>
        <Logo>morena.</Logo>
        <NavItem as={Link} to="/create-event">Criar evento</NavItem>
        <NavItem >SAIR</NavItem>
      </Navbar>

      <Container>
        <Title>Meus Eventos</Title>
        <EventsGrid>
          {events.length > 0 ? (
            events.map(event => (
              <EventCard key={event.id} onClick={() => handleCardClick(event.uuid_code)}>
                <EventDate>{new Date(event.starts_at).toLocaleDateString()}</EventDate>
                <EventTitle>{event.name}</EventTitle>
                <EventLocation>{event.address}, {event.city} - {event.state}</EventLocation>
              </EventCard>
            ))
          ) : (
            <p>Nenhum evento encontrado.</p>
          )}
        </EventsGrid>
      </Container>
    </>
  );
}

export default Evento;
