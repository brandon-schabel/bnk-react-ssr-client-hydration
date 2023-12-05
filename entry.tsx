
import { MiddlewareConfigMap, RouteHandler, Routes, serverFactory } from "bnkit/server";
import { renderToReadableStream } from "react-dom/server";
import { App } from "./app";

const buildFolder = "./build";
const buildFile = "/entry.js";

export const buildPath = buildFolder + buildFile;

export const createReactStreamHandler = async ({
  renderNode,
  entryPath
}: {
  renderNode: React.ReactNode;
  entryPath: string;
}) => {
  const reactDomStreamHandler: RouteHandler<any> = async (req) => {
    const stream = await renderToReadableStream(renderNode, {
      bootstrapScripts: [entryPath],
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  };

  return reactDomStreamHandler;
};


export const createBuild = (entryPoint = "entry.tsx") => {
  return Bun.build({
    entrypoints: [entryPoint],
    target: "browser",
    outdir: buildFolder,
  });
};

const result = await createBuild();
const outFile = result.outputs[0]


export const createReactServerRoutes = async <MiddlewareConfig extends MiddlewareConfigMap, State extends object>({
  Component,
}: {
  Component: React.ReactNode;
}) => {
  const routes: Routes<MiddlewareConfig> = {
    "/": {
      get: await createReactStreamHandler({
        renderNode: Component,
        entryPath: buildPath,
      }),
    },
    "^/build/.+": {
      get: () => {
        return new Response(outFile, {
          headers: {
            "Content-Type": "application/javascript",
          },
        });
      },
    },
  };

  return routes;
};

export const reactServer = async <AppStateT extends object = {}>({
  Entry,
  port = 3000,
}: {
  Entry: React.ReactNode;
  port?: number;
  // buildPath?: string;
  // fileBuildName?: string;
}) => {
  // ssr everything and use a server side state manager to handle all interactions
  const middlewareConfig = {
  } satisfies MiddlewareConfigMap;

  const { start } = serverFactory({
    serve: Bun.serve,
    // serve,
    routes: await createReactServerRoutes({
      Component: Entry,
    }),
  });

  start(port);
};


reactServer({
  Entry: <App />
})