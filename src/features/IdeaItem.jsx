import { useState, useEffect } from "react";
import styled from "styled-components";
import TextInputWithLabel from "../shared/TextInputWithLabel";

const IdeaContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["category", "x", "y"].includes(prop),
})`
  position: absolute;
  width: 160px;
  height: 80px;
  border: 3px solid;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 3;

  ${(props) => {
    const colors = {
      Priority: "#ff4444",
      "Not as Urgent": "#4444ff",
      Whatever: "#44ff44",
      Uncategorized: "#888888",
    };
    return `border-color: ${colors[props.category] || "#888888"};`;
  }}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

const IdeaText = styled.span`
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  color: black;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CategoryDropdown = styled.select`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  z-index: 10;
  color: black;
`;

const EditForm = styled.form`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 250px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["primary", "secondary", "neutral"].includes(prop),
})`
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;

  ${(props) =>
    props.primary &&
    `
      background-color: #4CAF50;
      color: white;
      &:hover {
        background-color: #45a049;
      }
    `}

  ${(props) =>
    props.secondary &&
    `
      background-color: #f44336;
      color: white;
      &:hover {
        background-color: #da190b;
      }
    `}
  
    ${(props) =>
    props.neutral &&
    `
      background-color: #ddd;
      color: black;
      &:hover {
        background-color: #bbb;
      }
    `}
`;

function IdeaItem({
  idea,
  position,
  onUpdateIdea,
  onUpdateIdeaCategory,
  onDeleteIdea,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [workingContent, setWorkingContent] = useState(idea.content);

  useEffect(() => {
    setWorkingContent(idea.content);
  }, [idea]);

  const categories = ["Priority", "Not as Urgent", "Whatever", "Uncategorized"];

  function handleClick(event) {
    event.stopPropagation();
    if (!isEditing) {
      setShowCategoryDropdown(!showCategoryDropdown);
    }
  }

  function handleCategoryChange(event) {
    const newCategory = event.target.value;
    onUpdateIdeaCategory(idea.id, newCategory);
    setShowCategoryDropdown(false);
  }

  function handleDoubleClick(event) {
    event.stopPropagation();
    setIsEditing(true);
    setShowCategoryDropdown(false);
  }

  function handleCancel() {
    setWorkingContent(idea.content);
    setIsEditing(false);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (workingContent.trim() === "") return;

    onUpdateIdea({
      ...idea,
      content: workingContent.trim(),
      positionX: position.x,
      positionY: position.y,
    });
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this idea?")) {
      onDeleteIdea(idea.id);
    }
    setIsEditing(false);
  }

  useEffect(() => {
    function handleClickOutside() {
      setShowCategoryDropdown(false);
    }

    if (showCategoryDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }

    return () => {};
  }, [showCategoryDropdown]);

  return (
    <>
      <IdeaContainer
        x={position.x}
        y={position.y}
        category={idea.category}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <IdeaText>{idea.content}</IdeaText>

        {showCategoryDropdown && !isEditing && (
          <CategoryDropdown
            value={idea.category}
            onChange={handleCategoryChange}
            onClick={(e) => e.stopPropagation()}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </CategoryDropdown>
        )}
      </IdeaContainer>

      {isEditing && (
        <EditForm
          onSubmit={handleUpdate}
          style={{ left: position.x + 80, top: position.y - 60 }}
        >
          <TextInputWithLabel
            elementId={`edit-idea-${idea.id}`}
            labelText="Edit Idea"
            value={workingContent}
            onChange={(e) => setWorkingContent(e.target.value)}
          />
          <ButtonGroup>
            <ActionButton type="submit" primary>
              Update
            </ActionButton>
            <ActionButton type="button" neutral onClick={handleCancel}>
              Cancel
            </ActionButton>
            <ActionButton type="button" secondary onClick={handleDelete}>
              Delete
            </ActionButton>
          </ButtonGroup>
        </EditForm>
      )}
    </>
  );
}

export default IdeaItem;
