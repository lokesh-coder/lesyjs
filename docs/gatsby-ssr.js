const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([<script src="/js/theme.js" />]);
};
