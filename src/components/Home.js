import React, { useContext } from "react";
import Feed from "./Feed";
import DataContext from "../Context/DataContext";

const Home = () => {
  const { searchResult,fetchError,isLoading } = useContext(DataContext)
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{color:"red"}}>{fetchError}</p>} 
      {!isLoading && !fetchError && ( searchResult.length ? (
        <Feed posts={searchResult} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display</p>
      ))}
    </main>
  );
};

export default Home;
