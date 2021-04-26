import React from "react";

const MacFrame = ({ title, children, lang }) => {
  return (
    <div className="mb-3 overflow-hidden bg-gray-700 rounded-lg shadow-2xl dark _override">
      <header className="flex items-center justify-between px-3 py-2">
        <div className="flex">
          <i className="block w-2 h-2 mr-1 rounded-full bg-window-first"></i>
          <i className="block w-2 h-2 mr-1 rounded-full bg-window-second"></i>
          <i className="block w-2 h-2 rounded-full bg-window-third"></i>
        </div>
        <div className="flex justify-center flex-1 mr-8 font-mono text-xs text-gray-400">
          {title}
        </div>
      </header>
      <main className="text-gray-300">
        <pre>
          <code className={`language-${lang}`}>{children}</code>
        </pre>
      </main>
    </div>
  );
};

export default MacFrame;
