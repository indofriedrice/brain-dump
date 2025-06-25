import { useState, useRef } from "react";
import styled from "styled-components";
import TextInputWithLabel from "../shared/TextInputWithLabel";

const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const StyledButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const CloudBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 250px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 50px;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 20px;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    top: -30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 50%;
  }
`;

function IdeaForm({ onAddIdea, isSaving }) {
  const [workingIdea, setWorkingIdea] = useState("");
  const ideaContentInput = useRef("");

  function handleAddIdea(event) {
    event.preventDefault();

    const newIdea = {
      content: workingIdea,
      id: Date.now(),
    };

    onAddIdea(newIdea);

    setWorkingIdea("");
    ideaContentInput.current.focus();
  }

  return (
    <>
      <CloudBackground />
      <StyledForm onSubmit={handleAddIdea}>
        <TextInputWithLabel
          elementId="ideaContent"
          labelText="New Idea"
          ref={ideaContentInput}
          value={workingIdea}
          onChange={(e) => setWorkingIdea(e.target.value)}
        />
        <StyledButton type="submit" disabled={workingIdea.trim() === ""}>
          {isSaving ? "Saving..." : "Add Idea"}
        </StyledButton>
      </StyledForm>
    </>
  );
}

export default IdeaForm;
