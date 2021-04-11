import React, { useState, createContext ,useReducer} from "react";
import {initialState,postReducer} from '../../reducers/postReducer'

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
 // const [feed, setFeed] = useState([]);
 const [stateFeed, dispatchFeed] = useReducer(postReducer, initialState);
  return (
    <PostContext.Provider value={{ stateFeed, dispatchFeed }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
