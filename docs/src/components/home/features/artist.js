import React from "react";
import SplitCard from "../split-card";

const ArtistFeature = () => {
  return (
    <div className="py-5 bg-gray-100 dark:bg-gray-700">
      <SplitCard
        text1="_Paint and redraw_ interface elements"
        text2="Artist UI is an another cool plugin which helps you to render dynamic elements by updating the screen content on data change. 
        <br/><br/>
        Artist can also be used independently without lesy, and it comes with commonly used interface elements like, spinner, progress bar, log, colors, layout, and much more. Also, Artist can be extended with plugins!"
        link="/plugins/official/artist"
      >
        <div className="py-6 mx-8">
          <img
            src="/images/render1612453288681.gif"
            className="w-full border rounded-lg shadow-2xl dark:border-gray-600"
          />
        </div>
      </SplitCard>
    </div>
  );
};

export default ArtistFeature;
