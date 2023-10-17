

import { HtmlDocument, hydrateClient } from "@bnk/react-server";

const AppEntry = () => {
  return <h1>Test Component</h1>;
};

export const App = () => {
  return (
    <HtmlDocument entryFilePath="./app.js">
      <AppEntry />
    </HtmlDocument>
  );
};

hydrateClient({
  AppEntry: <AppEntry />,
});
