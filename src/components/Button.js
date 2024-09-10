import React from "react";
import styled from "styled-components";

export const ButtonStyled = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: #046ee5;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
`;

const Button = ({ Text, onClick, Type = "button" }) => {
  return (
    <ButtonStyled type={Type} onClick={onClick}>
      {Text}
    </ButtonStyled>
  );
};

export default Button;