import React from "react";
import SplitCard from "../split-card";

const PilotFeature = () => {
  return (
    <div className="py-5">
      <SplitCard
        text1="Run commands from _web interface_"
        text2="Pilot Dashboard is one of the lesy plugins which allows you to view and run commands of any lesy projects  from web UI. Pilot comes with inbuild customizable console panel, config viewer, prompt modal support, responsive layout and more."
        align="left"
        link="/plugins/official/pilot-dashboard"
      >
        <div className="py-6 mx-8 ">
          <img
            src="/images/pilot/console.png"
            className="rounded-lg shadow-2xl "
            width="100%"
          />
        </div>
      </SplitCard>
    </div>
  );
};

export default PilotFeature;
