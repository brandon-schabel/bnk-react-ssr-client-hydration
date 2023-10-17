import { reactServer } from "@bnk/react-server";
import Bun from "bun";
import { App } from "./app";

// await createBuild();

export const createBuild = async (
  {
    entryPoint = "./app.tsx",
  }: {
    entryPoint: string;
  } = {
    entryPoint: "./app.tsx",
  }
) => {
  console.log("building", entryPoint);
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
  console.log(builds);
  return builds;
};


await createBuild()
reactServer({
  Entry: <App />,
  serve: Bun.serve,
  buildPath: "./build/app.js",
  fileBuildName: "app.js",  
});
