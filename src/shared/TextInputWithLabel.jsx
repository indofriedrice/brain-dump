import { forwardRef } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  margin-right: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 200px;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
  }
`;

const TextInputWithLabel = forwardRef(function TextInputWithLabel(
  { elementId, labelText, onChange, value, placeholder = "Enter your idea..." },
  ref
) {
  return (
    <>
      {labelText && <StyledLabel htmlFor={elementId}>{labelText}</StyledLabel>}
      <StyledInput
        type="text"
        id={elementId}
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
});

export default TextInputWithLabel;
