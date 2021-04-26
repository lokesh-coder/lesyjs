import React from "react";
import lesyLogoLineColor from "@lesy/brand/logo-line-color.png";
import lesyLogoLinePng from "@lesy/brand/logo-line.png";
import lesyLogoLineSvg from "@lesy/brand/logo-line.svg";
import lesyLogoLineAnimated from "@lesy/brand/logo-outline-animated.svg";
import lesyLogoLine from "@lesy/brand/logo-line.png";
import lesyLogoPng from "@lesy/brand/logo.png";
import lesyLogoSvg from "@lesy/brand/logo.svg";
import Heading from "../components/common/heading";
import GeneralLayout from "../layouts/general.layout";
import LinkButton from "../components/common/link-button";

const BrandingPage = () => {
  const assets = [
    [lesyLogoLineColor, "Color line PNG"],
    [lesyLogoLinePng, "White PNG"],
    [lesyLogoLineSvg, "White SVG"],
    [lesyLogoLineAnimated, "Animated SVG"],
    [lesyLogoLine, "Line PNG"],
    [lesyLogoPng, "Fill PNG"],
    [lesyLogoSvg, "Fill SVG"],
  ];
  return (
    <GeneralLayout>
      <div className="container">
        <Heading title="Branding" desc="Lesy's brand assets" />
        <div>
          <div className="flex justify-around">
            {assets.map(([item, name]) => {
              return (
                <div className="flex flex-col items-center p-5 bg-gray-100 shadow-xl dark:bg-gray-700 rounded-xl">
                  <img src={item} width="100" title={name} />
                  <div className="mt-2 text-sm font-medium text-gray-500">
                    {name}
                  </div>
                </div>
              );
            })}
          </div>
          <Heading
            title="Assets repo"
            desc="Browse all assets from the github repository"
          />
          <LinkButton
            href="https://github.com/lesyjs/brand"
            external
            icon="external-link-line"
          >
            Branding assets
          </LinkButton>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default BrandingPage;
