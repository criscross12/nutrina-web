import { createContext, useState, useContext } from "react";
export const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const valor = { currentUser, setCurrentUser };
  return <DataContext.Provider value={valor}>{children}</DataContext.Provider>;
};

export function useAppContext() {
  const context = useContext(DataContext);
  if (!context) {
    console.log("Error deploying App context");
  }
  return context;
}

export default DataContextProvider;
