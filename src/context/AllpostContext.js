import React, { useState, createContext ,useReducer} from "react";
import {initialState,allpostReducer} from '../reducers/allpostReducer'

export const AllpostContext = createContext(null);

export const AllpostProvider = ({ children }) => {
 // const [feed, setFeed] = useState([]);
 const [stateAllpost, dispatchAllpost] = useReducer(allpostReducer, initialState);
  return (
    <AllpostContext.Provider value={{ stateAllpost, dispatchAllpost }}>
      {children}
    </AllpostContext.Provider>
  );
};

export default AllpostProvider;
