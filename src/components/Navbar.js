import React, { useContext } from "react";
import DataContext from "../Context/DataContext";
import { PiNotepadDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="navbar">
        <p>{<PiNotepadDuotone className="logo" />}Notepad</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Create</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
