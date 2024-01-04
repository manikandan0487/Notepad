import React, { useContext } from "react";
// import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { PiChatCircleTextFill } from "react-icons/pi";
import DataContext from "../Context/DataContext";
const Header = ({ title }) => {
  const {width} = useContext(DataContext)
  return (
    <header className="Header">
      <h1>{title}</h1>
      {/* {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )} */}
      {
        <span><PiChatCircleTextFill className="logos"/></span>
      }
    </header>
  );
};

export default Header;
