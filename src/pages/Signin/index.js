import React, { useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  font-weight: bold;
`;

const FormSection = styled.div`
  width: 45%;
  padding: 40px;
  background-color: #f2f2f2;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const FormSubtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
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

const EyeIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 35px;
  cursor: pointer;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;

const InputWrapper = styled.div`
  position: relative;
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

const Signin = () => {
  const { signin, signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(email, senha); // Fazendo a função assíncrona

    if (res) {
      setError(res);
      return;
    }

    navigate("/eventos");
  };

  const handleSignup = async () => {
    if (!nome || !emailCadastro || !senhaCadastro) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signup(nome, emailCadastro, senhaCadastro);

    if (res && res !== "Usuário criado com sucesso!") {
      setError(res); // Se houver um erro, define a mensagem de erro
    } else {
      alert("Usuário cadastrado com sucesso!"); // Exibe o alerta em caso de sucesso
      navigate("/eventos"); // Navega para a próxima página
    }
  };

  return (
    <>
      <Navbar>
        <NavItem as={Link} to="/">Criar evento</NavItem>
        <NavItem as={Link} to="/signin">Entrar</NavItem>
      </Navbar>
      <Container>

      <Wrapper>
        {/* Formulário de Login */}
        <FormSection>
          <FormTitle>Entre com sua conta</FormTitle>
          <FormSubtitle>Entre com sua conta para participar do evento</FormSubtitle>
          <Input 
            type="email" 
            placeholder="Digite seu email" 
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <InputWrapper>
            <Input 
              type="password" 
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => [setSenha(e.target.value), setError("")]}     
            />
            <EyeIcon>👁</EyeIcon>
          <LabelError>{error}</LabelError> {/* Corrigido para LabelError */}
          </InputWrapper>
          <Button onClick={handleLogin}>Acessar</Button>
        </FormSection>

        {/* Formulário de Cadastro */}
        <FormSection>
          <FormTitle>Cadastre-se</FormTitle>
          <FormSubtitle>Cadastre-se para participar ou criar um evento</FormSubtitle>
          <Input 
            type="text" 
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setError("")]} 
          />
          <Input 
            type="email" 
            placeholder="Digite seu email" 
            value={emailCadastro}
            onChange={(e) => [setEmailCadastro(e.target.value), setError("")]}
          />
          <InputWrapper>
            <Input 
              type="password" 
              placeholder="Digite sua senha" 
              value={senhaCadastro}
              onChange={(e) => [setSenhaCadastro(e.target.value), setError("")]}
            />
            <EyeIcon>👁</EyeIcon>
          </InputWrapper>
          <Button onClick={handleSignup} >Criar Conta</Button>
        </FormSection>
      </Wrapper>
      </Container>
    </>
  );
}

export default Signin;
