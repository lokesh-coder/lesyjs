import React from "react";

const MacFrame = ({ title, children }) => {
  return (
    <div className="rounded overflow-hidden shadow-xl mb-3">
      <header className="bg-dark-100 px-2 flex justify-between items-center">
        <div className="flex">
          <i className="bg-window-first w-2 h-2 rounded-full block mr-1"></i>
          <i className="bg-window-second w-2 h-2 rounded-full block mr-1"></i>
          <i className="bg-window-third w-2 h-2 rounded-full block"></i>
        </div>
        <div className="text-gray-500 text-xs font-mono">{title}</div>
      </header>
      <main className="bg-dark-200">{children}</main>
    </div>
  );
};

export default MacFrame;
