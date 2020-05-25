import React from "react";
import Particles from "react-particles-js";
const isMobile =
  typeof navigator == "function"
    ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    : false;

const ParticlesBg = () => {
  return (
    <div className="absolute top-0 left-0 w-full">
      <Particles
        height="200px"
        params={{
          particles: {
            shape: {
              type: ["circle", "triangle"],
            },
            number: {
              value: isMobile ? 30 : 100,
            },
            size: {
              value: 1,
            },
            events: {
              resize: true,
            },
            color: {
              value: ["#ddd"],
            },
            line_linked: {
              color: "#CBD5E0",
            },
          },
        }}
      />
    </div>
  );
};
export default ParticlesBg;
