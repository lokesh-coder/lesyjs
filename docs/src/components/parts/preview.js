import React, { useState } from "react";

const Preview = () => {
  const [slide, setSlide] = useState(2);
  return (
    <div className="container m-auto py-8 ">
      <div className="px-6 lg:w-8/12 mx-auto ">
        <div className="preview">
          <div className="shadow-2xl p-4 lg:p-10 bg-white ">
            {slide === 0 && (
              <img
                src="/images/editor.gif"
                className="border border-gray-300"
                alt="editor-img"
              />
            )}
            {slide === 1 && (
              <img
                src="/images/command.gif"
                className="border border-gray-300"
                alt="command-img"
              />
            )}
            {slide === 2 && (
              <img
                src="/images/pilot-ui-min.gif"
                className="border border-gray-300"
                alt="pilot-img"
              />
            )}
          </div>
        </div>

        <ul className="flex items-center justify-center my-10">
          <li>
            <div
              className={`text-sm font-medium cursor-pointer hover:text-blue-600  ${
                slide === 0 ? "text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setSlide(0)}
              onKeyPress={() => {}}
              role="button"
              tabIndex="0"
            >
              Write commands
            </div>
          </li>
          <li className="flex">
            <i className="ri-arrow-right-s-line text-lg leading-none lg:mx-5 text-gray-500" />
          </li>
          <li>
            <div
              className={`text-sm font-medium cursor-pointer hover:text-blue-600  ${
                slide === 1 ? "text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setSlide(1)}
              onKeyDown={() => {}}
              role="button"
              tabIndex="0"
            >
              Start server
            </div>
          </li>
          <li className="flex">
            <i className="ri-arrow-right-s-line text-lg leading-none lg:mx-5 text-gray-500" />
          </li>
          <li>
            <div
              className={`text-sm font-medium mr-2 cursor-pointer hover:text-blue-600 ${
                slide === 2 ? "text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setSlide(2)}
              onKeyDown={() => {}}
              role="button"
              tabIndex="0"
            >
              Play with pilot
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Preview;
