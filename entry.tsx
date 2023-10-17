import { reactServer } from "@bnk/react-server";
import Bun from "bun";
import { App } from "./app";

export const createBuild = async (entryPoint: string = "./src/entry.tsx") => {
  const builds = await Bun.build({
    entrypoints: [entryPoint],
    target: "browser",
    minify: {
      identifiers: true,
      syntax: true,
      whitespace: true,
    },
    outdir: "./build",
  });

  return builds;
};

await createBuild();

reactServer({
  Entry: <App />,
  serve: Bun.serve,
  buildPath: "./build/app.js",
  fileBuildName: "app.js",
});
