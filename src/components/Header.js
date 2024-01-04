import React from "react";
import { PiNotepadDuotone } from "react-icons/pi";
const Header = () => {
  return (
    <header className="Header">
      <h1>Notepad</h1>
      {
        <span><PiNotepadDuotone className="logos"/></span>
      }
    </header>
  );
};

export default Header;
