import React from "react";
import Step from "./step";
import MacFrame from "./mac-frame";
import EditorFrame from "./editor-frame";
const codes = {};
codes["1"] = `$ npx lesy new my-cli`;
codes["2"] = `export default {
  name: "hello",
  run:() => console.log("Hello world!")
}`;
codes["3"] = `$ ./bin/cmd hello`;

const Frame = ({ role, children }) => {
  if (role === "editor")
    return <EditorFrame filename="hello.js">{children}</EditorFrame>;
  return (
    <MacFrame title="terminal">
      <div className="p-3">{children}</div>
    </MacFrame>
  );
};

const Example = ({ icon, step, title, lang, role = "terminal" }) => {
  return (
    <div className="mb-8 dark-syntax">
      <Step icon={icon} step={step} title={title} />
      <div className="code-container">
        <Frame role={role}>
          <pre>
            <code className={`language-${lang}`}>{codes[step]}</code>
          </pre>
        </Frame>
      </div>
    </div>
  );
};
export default Example;
