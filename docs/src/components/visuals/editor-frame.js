import React from "react";
import MacFrame from "./mac-frame";

const EditorFrame = ({ filename, children }) => {
  return (
    <MacFrame title="editor">
      <div className="bg-dark-300 shadow-lg flex">
        <div className="bg-dark-400 inline-block px-4 text-xs text-gray-500">
          {filename}
        </div>
      </div>
      <div className="p-3">{children}</div>
    </MacFrame>
  );
};

export default EditorFrame;
