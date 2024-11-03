/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { SHIRT_SIDE } from "../constants";

const initialState = {
  data: { shirt_side: SHIRT_SIDE.FRONT },
  updateData: null,
};

export const DataContext = createContext(initialState);

export const DataContextProvider = ({ children, value }) => {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }

  return context;
};
