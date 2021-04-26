import React from "react";
import Step from "./step";
import MacFrame from "./mac-frame";
const codes = {};
codes["1"] = `> npx lesy new my-cli`;
codes["2"] = `export default {
  name: "greet",
  run:() => console.log("Hello!")
}`;
codes["3"] = `> ./bin/cmd greet`;

const Example = ({ icon, step, title, lang, role }) => {
  return (
    <div className="mb-8">
      <Step icon={icon} step={step} title={title} />
      <div className="code-container">
        <MacFrame title={role} lang={lang}>
          {codes[step]}
        </MacFrame>
      </div>
    </div>
  );
};
export default Example;
