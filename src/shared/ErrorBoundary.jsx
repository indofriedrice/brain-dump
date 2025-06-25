import styled from "styled-components";

const ErrorContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4444;
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ErrorButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-left: 1rem;
  cursor: pointer;
  text-decoration: underline;
`;

function ErrorBoundary({ children, errorMessage, onClearError }) {
  if (!errorMessage) return children;

  return (
    <>
      <ErrorContainer>
        {errorMessage}
        <ErrorButton onClick={onClearError}>Dismiss</ErrorButton>
      </ErrorContainer>
      {children}
    </>
  );
}

export default ErrorBoundary;
