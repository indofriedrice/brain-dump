export const initialState = {
  ideaList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
};

export const actions = {
  fetchIdeas: "fetchIdeas",
  loadIdeas: "loadIdeas",
  setLoadError: "setLoadError",
  startRequest: "startRequest",
  addIdea: "addIdea",
  endRequest: "endRequest",
  updateIdea: "updateIdea",
  deleteIdea: "deleteIdea",
  revertIdea: "revertIdea",
  clearError: "clearError",
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchIdeas:
      return { ...state, isLoading: true };

    case actions.loadIdeas: {
      const fetchedData = action.records.map((record) => {
        const idea = {
          id: record.id,
          ...record.fields,
        };
        // Set default category if not present
        if (!idea.category) {
          idea.category = "Uncategorized";
        }
        // Set default position if not present
        if (typeof idea.positionX !== "number") {
          idea.positionX = 50;
        }
        if (typeof idea.positionY !== "number") {
          idea.positionY = 50;
        }
        return idea;
      });

      return {
        ...state,
        ideaList: fetchedData,
        isLoading: false,
      };
    }

    case actions.setLoadError:
      return { ...state, errorMessage: action.error.message, isLoading: false };

    case actions.startRequest:
      return { ...state, isSaving: true };

    case actions.addIdea:
      const records = action.records;
      const savedIdea = {
        id: records[0].id,
        ...records[0].fields,
      };

      // Set defaults if not present
      if (!savedIdea.category) {
        savedIdea.category = "Uncategorized";
      }
      if (typeof savedIdea.positionX !== "number") {
        savedIdea.positionX = 50;
      }
      if (typeof savedIdea.positionY !== "number") {
        savedIdea.positionY = 50;
      }

      return {
        ...state,
        ideaList: [...state.ideaList, savedIdea],
        isSaving: false,
      };

    case actions.endRequest:
      return { ...state, isLoading: false, isSaving: false };

    case actions.revertIdea:
      return {
        ...state,
        ideaList: action.editedIdea,
        errorMessage: action.error ? action.error.message : "",
      };

    case actions.updateIdea: {
      const updatedIdeas = state.ideaList.map((idea) =>
        idea.id === action.editedIdea.id
          ? { ...idea, ...action.editedIdea }
          : idea
      );

      return {
        ...state,
        ideaList: updatedIdeas,
      };
    }

    case actions.deleteIdea: {
      const filteredIdeas = state.ideaList.filter(
        (idea) => idea.id !== action.ideaId
      );

      return {
        ...state,
        ideaList: filteredIdeas,
      };
    }

    case actions.clearError:
      return { ...state, errorMessage: "" };

    default:
      return state;
  }
}
