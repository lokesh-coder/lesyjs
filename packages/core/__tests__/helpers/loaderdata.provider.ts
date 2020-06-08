import { generateFiles } from "@lesy/test-utils";

const createDummyFilesStr = (root, paths, contentFn) => {
  const obj = {};
  paths.forEach((path: string) => {
    obj[`${root}/${path}`] = contentFn(path);
  });
  return obj;
};

export default (flavor: string, root: string) => {
  const tsp = (path: string) => `loaderfiles/ts/${path}`;
  const r = (path: string) => `${root}/loaderfiles/${flavor}/${path}`;

  const file = generateFiles({
    root: tsp(""),
    level: 1,
    files: 1,
    prefix: "",
    content: (i, fi) => `export default { abc:'xyz' };`,
  });

  const files = generateFiles({
    root: tsp("dummydir"),
    level: 1,
    files: 2,
    prefix: "",
    content: (i, fi) => `console.log('${i}')`,
  });

  const commands = generateFiles({
    root: tsp("cmddir"),
    level: 2,
    files: 2,
    prefix: "cmd",
    content: (i, fi) => `export default {name:'cmd${i}-${fi}',run:()=>{}}`,
  });

  const middlewares = generateFiles({
    root: tsp("mwdir"),
    level: 2,
    files: 2,
    prefix: "mw",
    content: (i, fi) => `export default {on:"START",run:()=>{}}`,
  });

  const features = generateFiles({
    root: tsp("ftdir"),
    level: 2,
    files: 2,
    prefix: "ft",
    content: (i, fi) => `export default function(){}`,
  });

  const pluginCmds = generateFiles({
    root: tsp("plugindir"),
    level: 2,
    files: 2,
    prefix: "cmd",
    content: (i, fi) =>
      `export default {name:'plugincmd${i}-${fi}',run:()=>{}}`,
  });
  const pluginMiddlewares = generateFiles({
    root: tsp("plugindir"),
    level: 2,
    files: 2,
    prefix: "mw",
    content: (i, fi) => `export default {on:"START",run:()=>{}}`,
  });

  const pluginFeatures = generateFiles({
    root: tsp("plugindir"),
    level: 2,
    files: 2,
    prefix: "ft",
    content: (i, fi) => `export default function(){}`,
  });

  return {
    ...file,
    ...files,
    ...commands,
    ...middlewares,
    ...features,
    ...pluginCmds,
    ...pluginMiddlewares,
    ...pluginFeatures,

    [tsp("plugindir/package.json")]: `{"name":"testplugin","main":"index.js"}`,
    [tsp("plugindir/index.ts")]: `export default {
      commands:[
          '${r(`plugindir/cmddir0/cmdfile0.${flavor}`)}',
          '${r("plugindir/cmddir0/cmddir1")}',
          { name: "pluginrawcmd", run: () => {} }
        ],
      middlewares:[
          '${r(`plugindir/mwdir0/mwfile0.${flavor}`)}',
          '${r("plugindir/mwdir0/mwdir1")}',
           {on: "END", run: () => {} }
        ],
      features:[
          '${r(`plugindir/ftdir0/ftfile0.${flavor}`)}',
          '${r("plugindir/ftdir0/ftdir1")}',
          () => {}
        ],
    }`,
  };
};
