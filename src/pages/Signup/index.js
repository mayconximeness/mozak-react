import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
`;

export const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [senhaConf, setsenhaConf] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!nome || !email || !senhaConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (senha !== senhaConf) {
      setError("As senhas não são iguais");
      return;
    }

    const res = await signup(nome, email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <Container>
      <Label>SISTEMA DE LOGIN</Label>
      <Content>
        <Input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => [setNome(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senhaConf}
          onChange={(e) => [setsenhaConf(e.target.value), setError("")]}
          />
        <Input
          type="password"
          placeholder="Confirme seu Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <LabelError>{error}</LabelError> {/* Corrigido para LabelError */}
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <LabelSignin>
          Já tem uma conta?
          <Strong>
            <Link to="/">&nbsp;Entre</Link>
          </Strong>
        </LabelSignin>
      </Content>
    </Container>
  );
};

export default Signup;
