import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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


const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 900px;
  padding: 30px;
  border-radius: 10px;
`;

const Title = styled.h1`
  grid-column: span 2;
  font-size: 1.8rem;
  text-align: center;
  color: #333;
`;

const Subtitle = styled.p`
  grid-column: span 2;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 20px;
  color: #666;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  grid-column: span 2;
`;

const Button = styled.button`
  grid-column: span 2;
  padding: 15px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    active: false,
    eventName: '',
    eventDescription: '',
    startDateTime: '',
    endDateTime: '',
    eventLimit: '',
    cep: '',
    address: '',
    complement: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log('Dados do formulário:', formData);
  };

  return (
<>
     <Navbar>
       <Logo>morena.</Logo>
       <NavItem as={Link} to="/create-event">Criar evento</NavItem>
       <NavItem >SAIR</NavItem>
     </Navbar>
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Cadastrar Evento</Title>
        <Subtitle>Cadastre-se para participar ou criar um evento.</Subtitle>

        <label>Ativo?</label>
        <Input type="checkbox" name="active" onChange={handleChange} />

        <label>CEP</label>
        <Input type="text" name="cep" value={formData.cep} onChange={handleChange} />

        <label>Nome do Evento</label>
        <Input type="text" name="eventName" value={formData.eventName} onChange={handleChange} />

        <label>Endereço</label>
        <Input type="text" name="address" value={formData.address} onChange={handleChange} />

        <label>Descrição do Evento</label>
        <TextArea name="eventDescription" value={formData.eventDescription} onChange={handleChange} />

        <label>Complemento</label>
        <Input type="text" name="complement" value={formData.complement} onChange={handleChange} />

        <label>Data/Hora Início do Evento</label>
        <Input type="datetime-local" name="startDateTime" value={formData.startDateTime} onChange={handleChange} />

        <label>Número</label>
        <Input type="text" name="number" value={formData.number} onChange={handleChange} />

        <label>Data/Hora Fim do Evento</label>
        <Input type="datetime-local" name="endDateTime" value={formData.endDateTime} onChange={handleChange} />

        <label>Bairro</label>
        <Input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />

        <label>Vagas para o Evento</label>
        <Input type="number" name="eventLimit" value={formData.eventLimit} onChange={handleChange} />

        <label>Cidade</label>
        <Input type="text" name="city" value={formData.city} onChange={handleChange} />

        <label>Estado</label>
        <Input type="text" name="state" value={formData.state} onChange={handleChange} />

        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
</>
  );
};

export default CreateEvent;
