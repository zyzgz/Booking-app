export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true };
    case "logout":
      return { ...state, isAuthenticated: false };
    default:
      throw new Error("Nie ma takiej akcji: " + action.type);
  }
};

export const initialState = {
  isAuthenticated: false,
};
