import { useEffect } from "react";
import styled from "styled-components";
import IdeaForm from "../features/IdeaForm";
import IdeaCloud from "../features/IdeaCloud";
import ErrorBoundary from "../shared/ErrorBoundary";
import Headers from "../shared/Headers";

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

// const Logo = styled.h1`
//   position: absolute;
//   top: 20px;
//   left: 20px;
//   z-index: 5;
//   font-family: "Comic Sans MS", "Marker Felt", fantasy;
//   font-size: 2.5rem;
//   color: #fff;
//   text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
//   margin: 0;
//   transform: rotate(-5deg);
// `;

// const ErrorMessage = styled.div`
//   position: absolute;
//   top: 80px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: #ff4444;
//   color: white;
//   padding: 1rem 2rem;
//   border-radius: 10px;
//   z-index: 10;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
// `;

// const ErrorButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   margin-left: 1rem;
//   cursor: pointer;
//   text-decoration: underline;
// `;

function IdeasPage({
  title,
  ideaList,
  isLoading,
  isSaving,
  errorMessage,
  onAddIdea,
  onUpdateIdea,
  onUpdateIdeaCategory,
  onDeleteIdea,
  onClearError,
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <PageContainer>
      <Headers title={title} />

      <ErrorBoundary errorMessage={errorMessage} onClearError={onClearError}>
        <IdeaForm onAddIdea={onAddIdea} isSaving={isSaving} />

        <IdeaCloud
          ideaList={ideaList}
          isLoading={isLoading}
          onUpdateIdea={onUpdateIdea}
          onUpdateIdeaCategory={onUpdateIdeaCategory}
          onDeleteIdea={onDeleteIdea}
        />
      </ErrorBoundary>
    </PageContainer>
  );
}

export default IdeasPage;
