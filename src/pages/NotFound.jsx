import styled from "styled-components";
import Headers from "../shared/Headers";

const NotFoundContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFoundContent = styled.div`
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const NotFoundTitle = styled.h1`
  font-family: "Comic Sans MS", "Marker Felt", fantasy;
  font-size: 4rem;
  margin: 0 0 1rem 0;
  transform: rotate(-3deg);
`;

const NotFoundMessage = styled.p`
  font-size: 1.5rem;
  margin: 0 0 2rem 0;
  font-weight: 500;
`;

const BackButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

function NotFound() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <NotFoundContainer>
      <Headers title="Not Found" />
      <NotFoundContent>
        <NotFoundTitle>404 ERROR!!!</NotFoundTitle>
        <NotFoundMessage>
          This idea seems to have wandered off into the digital void...
        </NotFoundMessage>
        <BackButton onClick={handleGoHome}>Return From The Void</BackButton>
      </NotFoundContent>
    </NotFoundContainer>
  );
}

export default NotFound;
