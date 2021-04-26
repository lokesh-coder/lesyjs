import React from "react";
import Heading from "../components/common/heading";
import TwoFoldCard from "../components/libraries/two-fold-card";
import GeneralLayout from "../layouts/general.layout";

const LibrariesPage = () => {
  const data = [
    {
      text1: "Terminal interface",
      text2: "No more boring display in CLI",
      text3:
        "Artist is an UI library which helps you to update console screen on data change. And not just that, Artist also comes bundled with all necessary elements like spinner, colums, tables, progress bar and more to spice up the visuals.",
      link: "/libraries/standalone/artist-UI",
      icon: "terminal-line",
      imgSrc: "/images/library-intros/artist.png",
    },
    {
      text1: "Object validator",
      text2: "Validate object agaist a scheme for low cost",
      text3:
        "A lightweight bare minimum core library to validate simple objects with your own custom rules and conditions. This also lets you to use async rules, custom response messages.",
      icon: "braces-line",
      link: "/libraries/standalone/object-validator",
      imgSrc: "/images/library-intros/validator.png",
      align: "left",
    },
  ];

  return (
    <GeneralLayout title="Libraries">
      <div className="container">
        <Heading
          title="Libraries"
          desc="List of standalone packages that can be used independently in any project without lesy"
        />
        <div>
          {data.map(library => (
            <TwoFoldCard {...library} />
          ))}
        </div>
      </div>
    </GeneralLayout>
  );
};

export default LibrariesPage;
