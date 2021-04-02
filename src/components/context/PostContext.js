import React, { useState, createContext } from "react";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);

  return (
    <PostContext.Provider value={{ feed, setFeed }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
