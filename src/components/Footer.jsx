import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 h-[10vh] w-full  text-white flex flex-col  justify-center items-center gap-1 py-5">
      <div className="right text-xl font-bold">
        <span className="text-green-700">&lt;</span>
        <span>Pass</span>
        <span className="text-green-700">Po/&gt;</span>
      </div>

      <div>
        <p className="flex justify-center items-center font-roboto text-sm">
          Created with
          <lord-icon
            src="https://cdn.lordicon.com/jpuldrhu.json"
            trigger="hover"
            stroke="bold"
            state="hover-subtle"
            colors="primary:#ffffff,secondary:#ffffff"
            className="w-15"
          ></lord-icon>
          by NavRaj
        </p>
      </div>
    </footer>
  );
};

export default Footer;
