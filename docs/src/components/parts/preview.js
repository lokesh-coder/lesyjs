import React, { useState } from "react";

const Preview = () => {
  const [slide, setSlide] = useState(2);
  return (
    <div className="container m-auto py-16 ">
      <div className="px-6 lg:w-8/12 mx-auto ">
        <span className="text-xs uppercase text-orange-700 text-center block font-medium tracking-tight">
          Pilot Interface
        </span>
        <h3 className="font-heading font-bold text-heading text-2xl px:text-3xl text-center mb-3 tracking-tight">
          Write once run in CLI or UI
        </h3>
        <p className="px-0 lg:px-12 text-center mb-10">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
          blanditiis quam quisquam quibusdam quos repudiandae harum repellat
          animi magni aliquid rerum molestias quod, vel explicabo .
        </p>
        <div className="preview">
          <div className="shadow-2xl p-4 lg:p-10 bg-white ">
            {slide === 0 && (
              <img
                src="/images/editor.gif"
                className="border border-gray-300"
              />
            )}
            {slide === 1 && (
              <img
                src="/images/command.gif"
                className="border border-gray-300"
              />
            )}
            {slide === 2 && (
              <img
                src="/images/pilot-ui-min.gif"
                className="border border-gray-300"
              />
            )}
          </div>
        </div>

        <ul className="flex items-center justify-center my-10">
          <li
            className={`text-sm font-medium cursor-pointer hover:text-blue-600  ${
              slide === 0 ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setSlide(0)}
          >
            Write commands
          </li>
          <li className="flex">
            <i className="ri-arrow-right-s-line text-lg leading-none lg:mx-5 text-gray-500" />
          </li>
          <li
            className={`text-sm font-medium cursor-pointer hover:text-blue-600  ${
              slide === 1 ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setSlide(1)}
          >
            Start server
          </li>
          <li className="flex">
            <i className="ri-arrow-right-s-line text-lg leading-none lg:mx-5 text-gray-500" />
          </li>
          <li
            className={`text-sm font-medium mr-2 cursor-pointer hover:text-blue-600 ${
              slide === 2 ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setSlide(2)}
          >
            Play with pilot
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Preview;
