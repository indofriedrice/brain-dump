import styled from "styled-components";
import Headers from "../shared/Headers";

const AboutContainer = styled.div`
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

const AboutContent = styled.div`
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  padding: 2rem;
`;

const AboutTitle = styled.h1`
  font-family: "Comic Sans MS", "Marker Felt", fantasy;
  font-size: 3rem;
  margin: 0 0 2rem 0;
  transform: rotate(-2deg);
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-weight: 400;
`;

const FeatureList = styled.ul`
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 2rem 0;
  padding-left: 2rem;
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
  margin-top: 2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

function About() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <AboutContainer>
      <Headers title="About" />
      <AboutContent>
        <AboutTitle>About Brain Dump</AboutTitle>
        <AboutText>
          Brain Dump is a creative way to organize your thoughts and ideas
          visually. Building off from the idea of a To Do List, Brain Dump lets
          you scatter your ideas across the screen and categorize them by
          priority and urgency. Fun Fact: I used a paper version of this prior
          to building this.
        </AboutText>
        <FeatureList>
          <li>Add up to 23 ideas across four categories</li>
          <li>Visual categorization with color-coded borders</li>
          <li>
            Priority (Red), Not as Urgent (Blue), Whatever (Green),
            Uncategorized (Gray)
          </li>
          <li>Click to change categories</li>
          <li>Double click to edit, or delete ideas</li>
          <li>Cloud-inspired design for creative thinking!</li>
        </FeatureList>
        <BackButton onClick={handleGoHome}>Start Brain Dumping~</BackButton>
      </AboutContent>
    </AboutContainer>
  );
}

export default About;
