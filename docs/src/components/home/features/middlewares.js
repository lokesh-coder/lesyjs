import React from "react";
import SplitCard from "../split-card";

const MiddlewareFeature = () => {
  return (
    <div className="py-5">
      <SplitCard
        text1="Efforlessly _hijack the flow_ with middlewares"
        text2="Middlewares are simple functions which will be executed during the lifecyle. With this, you will be able to add new functionallity, tweak and change the entire behaviour of the command at any point of the flow."
        align="left"
        link="/docs/components/middlewares"
      >
        <div className="py-6 md:mx-8 ">
          <img src="/images/home-illus/middleware.svg" />
        </div>
      </SplitCard>
    </div>
  );
};

export default MiddlewareFeature;
