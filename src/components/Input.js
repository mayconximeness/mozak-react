import React from "react";
import styled from "styled-components";

export const InputStyled = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;

  background-color: #f0f2f5;
  border: none;
`;

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <InputStyled
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;