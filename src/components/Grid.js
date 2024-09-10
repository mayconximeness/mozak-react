import React, { useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ({ tarefas, setTarefas, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8800/${id}`);
            const newArray = tarefas.filter((tarefa) => tarefa.id !== id);
            setTarefas(newArray);
            toast.success(data);
        } catch (error) {
            toast.error(error.response?.data || 'Ocorreu um erro');
        } finally {
            setOnEdit(null);
        }
    };

    const handleCheckboxChange = async (item) => {
        const updatedItem = {
            ...item,
            conclusao: item.conclusao === 1 ? 0 : 1
        };

        try {
            const { data } = await axios.put(`http://localhost:8800/${item.id}`, updatedItem);
            const newArray = tarefas.map((tarefa) =>
                tarefa.id === item.id ? updatedItem : tarefa
            );
            setTarefas(newArray);
            toast.success(data);
        } catch (error) {
            toast.error(error.response?.data || 'Ocorreu um erro');
        }
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th></Th>
                    <Th>Título</Th>
                    <Th>Descrição</Th>
                    <Th>Concluída</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {tarefas.map((item) => (
                    <Tr key={item.id}>
                         <Td alignCenter width="10%">
                            <input
                                type="checkbox"
                                checked={item.conclusao === 1}
                                onChange={() => handleCheckboxChange(item)}
                            />
                        </Td>
                        <Td width="30%">{item.titulo}</Td>
                        <Td width="30%">{item.descricao}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
