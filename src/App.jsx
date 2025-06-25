import { useState, useEffect, useCallback, useReducer } from "react";
import { Routes, Route, useLocation } from "react-router";
import styles from "./App.module.css";
import IdeasPage from "./pages/IdeasPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import {
  reducer as ideasReducer,
  actions as ideaActions,
  initialState as initialIdeaState,
} from "./reducers/ideas.reducer";

function App() {
  const [ideaState, dispatch] = useReducer(ideasReducer, initialIdeaState);
  const { ideaList, isLoading, isSaving, errorMessage } = ideaState;

  const [title, setTitle] = useState("Brain Dump");

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  // IMPORTANT NOTES: Coordinate assignments for each quadrant (max 6 per quadrant, 24 total)
  const getCoordinates = useCallback((index) => {
    const positions = [
      // Top-left (Priority) - positions 0-5
      { x: 10, y: 120 },
      { x: 200, y: 120 },
      { x: 390, y: 120 },
      { x: 10, y: 260 },
      { x: 200, y: 260 },
      { x: 390, y: 260 },

      // Top-right (Not as Urgent) - positions 6-11
      { x: window.innerWidth - 590, y: 120 },
      { x: window.innerWidth - 400, y: 120 },
      { x: window.innerWidth - 210, y: 120 },
      { x: window.innerWidth - 590, y: 260 },
      { x: window.innerWidth - 400, y: 260 },
      { x: window.innerWidth - 210, y: 260 },

      // Bottom-left (Whatever) - positions 12-17
      { x: 10, y: window.innerHeight - 200 },
      { x: 200, y: window.innerHeight - 200 },
      { x: 390, y: window.innerHeight - 200 },
      { x: 10, y: window.innerHeight - 100 },
      { x: 200, y: window.innerHeight - 100 },
      { x: 390, y: window.innerHeight - 100 },

      // Bottom-right (Uncategorized) - positions 18-23
      { x: window.innerWidth - 590, y: window.innerHeight - 200 },
      { x: window.innerWidth - 400, y: window.innerHeight - 200 },
      { x: window.innerWidth - 210, y: window.innerHeight - 200 },
      { x: window.innerWidth - 590, y: window.innerHeight - 100 },
      { x: window.innerWidth - 400, y: window.innerHeight - 100 },
      { x: window.innerWidth - 210, y: window.innerHeight - 100 },
    ];

    return positions[index] || { x: 50, y: 50 };
  }, []);

  const getCategoryIndex = (category, categoryCount) => {
    const baseIndex = {
      "Priority": 0,
      "Not as Urgent": 6,
      "Whatever": 12,
      "Uncategorized": 18,
    };

    return baseIndex[category] + categoryCount;
  };

  useEffect(() => {
    // Need to cancel ongoing fetch requests when they're no longer needed.
    const controller = new AbortController();

    const fetchIdeas = async () => {
      dispatch({ type: ideaActions.fetchIdeas });

      const options = {
        method: "GET",
        headers: {
          Authorization: token,
        },
        signal: controller.signal,
      };

      try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const data = await resp.json();

        dispatch({
          type: ideaActions.loadIdeas,
          records: data.records,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          dispatch({
            type: ideaActions.setLoadError,
            error,
          });
        }
      }
    };

    fetchIdeas();

    return () => {
      controller.abort();
    };
  }, [url, token]);

  const addIdea = async (newIdea) => {
    if (ideaList.length >= 23) {
      dispatch({
        type: ideaActions.setLoadError,
        error: { message: "Maximum 23 ideas allowed" },
      });
      return;
    }

    // Count ideas in Uncategorized category to determine position
    const uncategorizedCount = ideaList.filter(
      (idea) => idea.category === "Uncategorized"
    ).length;
    if (uncategorizedCount >= 6) {
      dispatch({
        type: ideaActions.setLoadError,
        error: {
          message:
            "Uncategorized category is full (6 ideas max). Please move some ideas to other categories first.",
        },
      });
      return;
    }

    dispatch({ type: ideaActions.startRequest });

    const coordinates = getCoordinates(
      getCategoryIndex("Uncategorized", uncategorizedCount)
    );

    const payload = {
      records: [
        {
          fields: {
            content: newIdea.content,
            category: "Uncategorized",
            positionX: coordinates.x,
            positionY: coordinates.y,
          },
        },
      ],
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();
      dispatch({
        type: ideaActions.addIdea,
        records,
      });
    } catch (error) {
      dispatch({
        type: ideaActions.setLoadError,
        error,
      });
    } finally {
      dispatch({ type: ideaActions.endRequest });
    }
  };

  const updateIdea = async (editedIdea) => {
    const originalIdeas = [...ideaList];

    dispatch({
      type: ideaActions.updateIdea,
      editedIdea,
    });

    const payload = {
      records: [
        {
          id: editedIdea.id,
          fields: {
            content: editedIdea.content,
            category: editedIdea.category,
            positionX: editedIdea.positionX,
            positionY: editedIdea.positionY,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      dispatch({
        type: ideaActions.revertIdea,
        editedIdea: originalIdeas,
        error,
      });
    }
  };

  const updateIdeaCategory = async (ideaId, newCategory) => {
    const idea = ideaList.find((i) => i.id === ideaId);
    if (!idea) return;

    // Check if target category has space
    const categoryCount = ideaList.filter(
      (i) => i.category === newCategory && i.id !== ideaId
    ).length;
    if (categoryCount >= 6) {
      dispatch({
        type: ideaActions.setLoadError,
        error: { message: `${newCategory} category is full (6 ideas max)` },
      });
      return;
    }

    const coordinates = getCoordinates(
      getCategoryIndex(newCategory, categoryCount)
    );

    const updatedIdea = {
      ...idea,
      category: newCategory,
      positionX: coordinates.x,
      positionY: coordinates.y,
    };

    await updateIdea(updatedIdea);
  };

  const deleteIdea = async (ideaId) => {
    const originalIdeas = [...ideaList];

    dispatch({
      type: ideaActions.deleteIdea,
      ideaId,
    });

    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };

    try {
      const resp = await fetch(`${url}/${ideaId}`, options);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      dispatch({
        type: ideaActions.revertIdea,
        editedIdea: originalIdeas,
        error,
      });
    }
  };

  const handleError = () => {
    dispatch({ type: ideaActions.clearError });
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Brain Dump");
    } else if (location.pathname === "/about") {
      setTitle("About");
    } else {
      setTitle("Not Found");
    }
  }, [location]);

  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route
          path="/"
          element={
            <IdeasPage
              title={title}
              ideaList={ideaList}
              isLoading={isLoading}
              isSaving={isSaving}
              errorMessage={errorMessage}
              onAddIdea={addIdea}
              onUpdateIdea={updateIdea}
              onUpdateIdeaCategory={updateIdeaCategory}
              onDeleteIdea={deleteIdea}
              onClearError={handleError}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
