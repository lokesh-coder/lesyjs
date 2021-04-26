import React from "react";
import { motion } from "framer-motion";
import SplitCard from "../split-card";

const data = [
  ["generator", "folder-open-line"],
  ["store", "database-2-line"],
  ["config", "file-code-line"],
  ["help", "questionnaire-line"],
  ["pilot", "dashboard-3-line"],
  ["artist", "paint-brush-line "],
  ["validator", "apps-2-line"],
  ["essentials", "shopping-bag-2-line"],
  ["prompt", "question-answer-line"],
];

const Bg = () => {
  return (
    <div className="absolute w-full h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="450"
        viewBox="0 0 450 400"
        fill="none"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M72.77 324V297L49.38 283.5L26 297V324L49.38 337.5M72.77 324L49.38 337.5M72.77 324L96.15 337.5M49.38 337.5V364.5L72.77 378L96.15 364.5M96.15 202.5V175.5L72.77 162L49.38 175.5V202.5L72.77 216M96.15 202.5L72.77 216M96.15 202.5L119.53 216V243L96.15 256.5L72.77 243V216M96.15 337.5V364.5M96.15 337.5L119.53 324L142.92 337.5V364.5L119.53 378L96.15 364.5M142.92 40.5L166.3 54M142.92 40.5L119.53 54V81L142.92 94.5L166.3 81V54M142.92 40.5V13.5L166.3 0L189.68 13.5V40.5L166.3 54M306.61 243L283.22 229.5L259.84 243V270L283.22 283.5L306.61 270M306.61 243V270M306.61 243L329.99 229.5M306.61 270L329.99 283.5M329.98 94.5L353.37 81V54L329.98 40.5L306.6 54V81M329.98 94.5L306.6 81M329.98 94.5V121.5M306.6 81L283.22 94.5V121.5L306.6 135L329.98 121.5M329.98 121.5L306.59 108L283.21 121.5M329.98 121.5V148.5L306.59 162L283.21 148.5M353.37 243L376.76 229.5V202.5L353.37 189L329.99 202.5V229.5M353.37 243L329.99 229.5M353.37 243V270M353.37 270L329.99 283.5M353.37 270L376.76 283.5M329.99 283.5V310.5L353.37 324L376.76 310.5M376.76 283.5V310.5M376.76 283.5L400.14 270L423.52 283.5V310.5L400.14 324L376.76 310.5M199.35 324V297L175.96 283.5L152.58 297V324L175.96 337.5M199.35 324L175.96 337.5M199.35 324L222.73 337.5M175.96 337.5V364.5L199.35 378L222.73 364.5M222.73 337.5V364.5M222.73 337.5L246.11 324L269.5 337.5V364.5L246.11 378L222.73 364.5M259.83 108V81L236.44 67.5L213.06 81V108L236.44 121.5M259.83 108L236.44 121.5M259.83 108L283.21 121.5M236.44 121.5V148.5L259.83 162L283.21 148.5M283.21 121.5V148.5M400.13 81L423.52 94.5V121.5L400.13 135L376.75 121.5V94.5L400.13 81Z"
            stroke="#8E99B6"
            strokeOpacity="0.1"
            strokeWidth="2"
          />
          <circle
            cx="234"
            cy="200"
            r="146.5"
            stroke="#8E99B6"
            strokeOpacity="0.47"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="7 7"
          />
          <path
            d="M227.366 214.552C228.714 214.253 229.563 212.917 229.264 211.569C228.964 210.221 227.629 209.372 226.281 209.671L227.366 214.552ZM219.028 206.244L221.505 205.906C221.502 205.886 221.499 205.866 221.496 205.846L219.028 206.244ZM227.662 195.934L227.471 193.441C227.453 193.442 227.435 193.444 227.418 193.446L227.662 195.934ZM240.152 207.25L242.644 207.059L242.644 207.059L240.152 207.25ZM226.572 221.668L226.488 219.169C226.462 219.17 226.436 219.171 226.41 219.173L226.572 221.668ZM209.221 205.573L206.721 205.633C206.722 205.667 206.724 205.701 206.726 205.734L209.221 205.573ZM228.249 186.461L228.21 188.961C228.271 188.962 228.333 188.961 228.394 188.957L228.249 186.461ZM249.708 207.502L252.207 207.524C252.208 207.493 252.207 207.461 252.206 207.429L249.708 207.502ZM225.901 231.475L225.901 233.975C225.914 233.975 225.927 233.975 225.941 233.975L225.901 231.475ZM200 205.405L202.5 205.405L202.5 205.405L200 205.405ZM227.801 171.176C229.003 170.497 229.427 168.972 228.747 167.77C228.068 166.568 226.543 166.144 225.341 166.824L227.801 171.176ZM226.281 209.671C224.205 210.132 221.849 208.432 221.505 205.906L216.551 206.581C217.212 211.432 221.898 215.767 227.366 214.552L226.281 209.671ZM221.496 205.846C220.933 202.352 223.929 198.813 227.907 198.422L227.418 193.446C221.168 194.06 215.447 199.741 216.56 206.642L221.496 205.846ZM227.854 198.426C232.841 198.043 237.248 202.098 237.659 207.442L242.644 207.059C242.05 199.325 235.561 192.819 227.471 193.441L227.854 198.426ZM237.659 207.442C238.123 213.477 232.79 218.959 226.488 219.169L226.655 224.166C235.442 223.874 243.353 216.279 242.644 207.059L237.659 207.442ZM226.41 219.173C218.907 219.659 212.224 213.265 211.715 205.411L206.726 205.734C207.39 215.987 216.131 224.849 226.733 224.162L226.41 219.173ZM211.72 205.512C211.503 196.529 218.993 188.816 228.21 188.961L228.289 183.962C216.215 183.771 206.436 193.828 206.721 205.633L211.72 205.512ZM228.394 188.957C238.333 188.381 246.908 197.267 247.209 207.575L252.206 207.429C251.837 194.77 241.301 183.201 228.105 183.966L228.394 188.957ZM247.208 207.48C247.157 213.139 244.896 218.555 240.908 222.571L244.456 226.094C249.363 221.152 252.145 214.489 252.207 207.524L247.208 207.48ZM240.908 222.571C236.92 226.587 231.52 228.885 225.861 228.975L225.941 233.975C232.904 233.864 239.548 231.036 244.456 226.094L240.908 222.571ZM225.901 228.975C213.052 228.974 202.5 218.295 202.5 205.405L197.5 205.405C197.499 221.014 210.249 233.974 225.901 233.975L225.901 228.975ZM202.5 205.405C202.5 191.076 212.204 179.994 227.801 171.176L225.341 166.824C209.145 175.98 197.501 188.383 197.5 205.405L202.5 205.405Z"
            fill="#8E99B6"
            fillOpacity="0.1"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="450" height="400" fill="#8E99B6" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

const rootVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 2,
    },
  },
};

const chipVariant = {
  hidden: { opacity: 0, y: 450 },
  show: { opacity: [0, 1, 0], y: [0, -400 / 2, -400], scale: [0.7, 1, 0.7] },
};

const pluginTransition = {
  times: [0, 0.5, 1],
  type: "tween",
  repeat: Infinity,
  repeatType: "loop",
  ease: "linear",
  duration: 8,
  repeatDelay: 10,
};

const PluginFeature = () => {
  return (
    <div className="py-5 bg-gray-100 dark:bg-gray-700">
      <SplitCard
        text1="_Extend and tweak_ the core with plugins"
        text2="By design, Lesy core is a thin layer of fundamental features which allows to extend the capabilities by adding extensions. <br/><br/> There are quite a few official plugins available for most common use cases like, automatic help generation, scaffolding, prompting, Web Interface, and more."
        link="/plugins"
      >
        <div className="w-full py-6">
          <div
            className="container relative flex items-center justify-center overflow-hidden"
            style={{ height: 450 }}
          >
            <Bg />
            <div className="w-full h-full lg:w-2/3 plugins-row">
              <motion.div
                variants={rootVariant}
                initial="hidden"
                animate="show"
                className="relative w-full h-full plugins-origin"
              >
                {data.map(([title, icon]) => {
                  return (
                    <motion.div
                      key={title}
                      variants={chipVariant}
                      transition={pluginTransition}
                      className="absolute bottom-0 left-0 w-full"
                    >
                      <div className="flex items-center px-5 py-3 my-2 rounded-lg shadow-2xl bg-secondary dark:bg-gray-900">
                        <i
                          className={`ri-${icon} mr-4 text-3xl text-gray-300 dark:text-primary`}
                        />
                        <div>
                          <div className="font-medium tracking-tight text-gray-100 text-md">
                            @lesy/lesy-plugin-{title}
                            <span className="font-bold dark:text-primary"></span>
                          </div>
                          <div className="w-full h-2 my-2 bg-gray-200 rounded-full opacity-50"></div>
                          <div className="w-2/3 h-2 bg-gray-200 rounded-full opacity-50"></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </SplitCard>
    </div>
  );
};

export default PluginFeature;
