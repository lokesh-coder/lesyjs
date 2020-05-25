const path = require("path");
const write = require("write");
const mkdirp = require("mkdirp");
const flatten = require("flat");
const execa = require("execa");
const fg = require("fast-glob");
const del = require("del");

const generateFiles = ({
  root = "",
  level = 3,
  files = 1,
  prefix = "",
  content = (i, di) => "_dummy_content_",
}) => {
  const obj = {};
  let currlv = "";
  let currlvIn = "";
  for (let i = 0; i < level; i++) {
    currlv += `/${prefix}dir${i}`;
    currlvIn += `${i !== 0 ? "-" : ""}${i}`;
    for (let ci = 0; ci < files; ci++) {
      obj[`${root}${currlv}/${prefix}file${ci}.ts`] = content(currlvIn, ci);
    }
  }
  return obj;
};

const createFiles = (data, cwd) => {
  data = flatten(data, { delimiter: "/" });
  Object.entries(data).forEach(([fname, content]) => {
    fname = path.join(cwd, fname);
    if (typeof content === "object") {
      mkdirp.sync(fname);
      return;
    }
    write.sync(fname, content);
  });
};

const buildFiles = (src, dest, cwd) => {
  const tsFiles = fg.sync(`${src}/**`, { cwd, absolute: true });
  execa.sync(
    "tsc",
    [...tsFiles, "--outDir", dest, "--allowJs", "--resolveJsonModule"],
    { cwd },
  );
};

const deleteDir = src => {
  del.sync(src, { force: true });
};

module.exports = {
  createFiles,
  buildFiles,
  deleteDir,
  generateFiles,
};
