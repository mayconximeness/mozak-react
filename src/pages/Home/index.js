import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Form from "../../components/Form.js";
import Grid from "../../components/Grid.js";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`

`;

function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getTarefas = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setTarefas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getTarefas();
  }, [setTarefas]);

  return (
    <>
      <Container>
        <Title>GERENCIAMENTO DE TAREFAS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getTarefas={getTarefas}/>
        <Grid tarefas={tarefas} setTarefas={setTarefas} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left"/>
    </>
  );
}

export default Home;
