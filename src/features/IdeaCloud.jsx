import IdeaItem from "./IdeaItem";
import styled from "styled-components";

const CloudContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const LoadingMessage = styled.p`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  color: black;
  z-index: 5;
`;

function IdeaCloud({
  ideaList,
  onUpdateIdea,
  onUpdateIdeaCategory,
  onDeleteIdea,
  isLoading,
}) {
  return (
    <CloudContainer>
      {isLoading && <LoadingMessage>Brain dump loading...</LoadingMessage>}

      {ideaList.map((idea) => {
        return (
          <IdeaItem
            key={idea.id}
            idea={idea}
            position={{ x: idea.positionX, y: idea.positionY }}
            onUpdateIdea={onUpdateIdea}
            onUpdateIdeaCategory={onUpdateIdeaCategory}
            onDeleteIdea={onDeleteIdea}
          />
        );
      })}
    </CloudContainer>
  );
}

export default IdeaCloud;
