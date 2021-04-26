import React from "react";
import MacFrame from "../mac-frame";
import SplitCard from "../split-card";

const TestingFeature = () => {
  const exampleCode = `import { resolve } from "path";
import { LesyTestBed } from "@lesy/testbed";
import greetCmd from "../greet";

describe("CLI", () => {
  let app;

  beforeAll(() => {
    app = new LesyTestBed({
      root: resolve(__dirname, "./"),
      commands: [greetCmd],
    });
  });

  it("should log proper output", async () => {
    let response = await app.run(["greet"]);
    expect(response).toContain("hello!");
  });
});
`;
  return (
    <div className="py-5 ">
      <SplitCard
        text1="Unit and integration _testing_ made simpler"
        text2="With Lesy TestBed API, test your commands, middlewares, features and plugins without much boilerplate code."
        align="left"
        link="/docs/testing/testbed"
      >
        <div className="py-6 md:mx-8">
          <MacFrame lang="js">{exampleCode}</MacFrame>
        </div>
      </SplitCard>
    </div>
  );
};

export default TestingFeature;
