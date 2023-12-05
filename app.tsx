// import { HtmlDocument } from "@bnk/react-server";
import React, { useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

export const HtmlDocument = ({
  children,
  entryFilePath,
}: {
  children?: React.ReactNode;
  entryFilePath: string;
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />

        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using U Toolkit" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <link rel="manifest" href="/manifest.json" />

        <title>React App</title>

        <script type="module" src={entryFilePath}></script>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">{children}</div>
      </body>
    </html>
  );
};


export const hydrateClient = ({ AppEntry }: { AppEntry: React.ReactNode }) => {
  if (typeof window !== "undefined") {
    const root = typeof document !== "undefined" && document.getElementById("root");

    if (!root) {
      console.error("Root node not found");
      throw new Error("Root node not found");
    }

    console.log("Hydrate!");
    hydrateRoot(root, <React.StrictMode>{AppEntry}</React.StrictMode>);
  }
};


const AppEntry = () => {
  useEffect(() => {
    console.log("running hook client side")
  }, []);

  return <h1>Test Component</h1>;
};

export const App = () => {
  return (
    <HtmlDocument entryFilePath={typeof window !== 'undefined' ? "./build/entry.js" : ''}>
      <AppEntry />
    </HtmlDocument>
  );
};

hydrateClient({
  AppEntry: <AppEntry />,
});
