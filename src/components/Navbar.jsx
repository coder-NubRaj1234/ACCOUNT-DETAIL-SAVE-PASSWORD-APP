import React from "react";

const Navbar = () => {
  return (
    <nav className="h-[8vh] bg-slate-900 text-white flex items-center text-xl font-bold justify-around">
      <div className="right ">
        <span className="text-green-700">&lt;</span>
        <span>Pass</span>
        <span className="text-green-700">Po/&gt;</span>
      </div>

      <div className="left">
        <button
        className="bg-green-700 flex justify-around items-center rounded-full px-2 outline ring ring-1"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jjxzcivr.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#ffffff"
          ></lord-icon>
          <span className="text-sm font-roboto "> GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
