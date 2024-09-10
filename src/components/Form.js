import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  width: 210px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const DescriptionInput = styled.input`
  width: 410px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
     padding: 10px;
     cursor: pointer;
     border-radius: 5px;
     border: none;
     background-color: #2c73d2;
     color: white;
     height: 42px;
`;

const Form = ({ getTarefas, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const tarefa = ref.current;

      tarefa.titulo.value = onEdit.titulo;
      tarefa.descricao.value = onEdit.descricao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');  // Verifique se esta mensagem aparece no console

    const tarefa = ref.current;

    if (
      !tarefa.titulo.value ||
      !tarefa.descricao.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if(onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          titulo: tarefa.titulo.value,
          descricao: tarefa.descricao.value
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          titulo: tarefa.titulo.value,
          descricao: tarefa.descricao.value
      })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    tarefa.titulo.value = "";
    tarefa.descricao.value = "";

    setOnEdit(null);
    getTarefas();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>    
          <InputArea>
               <Label>Título</Label>
               <TitleInput name="titulo" />
          </InputArea>
          <InputArea>
               <Label>Descrição</Label>
               <DescriptionInput name="descricao" type="text"/>
          </InputArea>

          <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
}

export default Form;
