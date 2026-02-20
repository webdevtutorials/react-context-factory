# React Context API with Multiple Providers.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

A quick-start guide to scaffolding a new React-Vite project with React Context API and muliple providers.

---

## To run the app:

```bash
cd react-context-multi
yarn install
yarn dev
```

## To build from scratch start a new Vite-React app:

```bash
cd tutorials

yarn create vite react-context-multi --template react
cd react-context-multi
```

## Initiate version control:

```bash
git init
git add .
git commit -m "Empty app"
git branch -m master main
```

## Upload to GitHub:

```bash
gh auth status
gh repo create react-context-multi --public --source=. --remote=origin --push
```

## Create multiple contexts, providers, and hooks. In the providers add data to share:

```js
// src / Context1
import { useState, useMemo, createContext, useContext } from "react";

const Context1 = createContext(undefined);

function Provider1({ children }) {
  const [data1, setData1] = useState("No data-1");
  const value = useMemo(() => [data1, setData1], [data1, setData1]);

  return <Context1.Provider value={value}>{children}</Context1.Provider>;
}

function useContext1() {
  const context = useContext(Context1);
  if (context === undefined)
    throw new Error("useContext1 must be used withing Provider1");

  return context;
}

export { Context1, useContext1, Provider1 };

// src / Context2
import { useState, useMemo, createContext, useContext } from "react";

const Context2 = createContext();

function Provider2({ children }) {
  const [data2, setData2] = useState("No data-2");
  const value = useMemo(() => [data2, setData2], [data2, setData2]);

  return <Context2.Provider value={value}>{children}</Context2.Provider>;
}

function useContext2() {
  const context = useContext(Context2);
  if (context === undefined)
    throw new Error("useContext2 must be used within Provider2");

  return context;
}

export { Context2, useContext2, Provider2 };
```

## Consolidate multiple providers

```js
// src / AppProviders.jsx
import { Provider1 } from "./Context1";
import { Provider2 } from "./Context2";

export function AppProviders({ children }) {
  return (
    <Provider1>
      <Provider2>{children}</Provider2>
    </Provider1>
  );
}
```

## Wrap consumers

```js
// src / main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProviders } from "./AppProviders";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
```

## Create consumer and access the data

```js
import { useEffect } from "react";
import { useContext1 } from "./Context1";
import { useContext2 } from "./Context2";

export default function Consumer() {
  const [data1, setData1] = useContext1();
  const [data2, setData2] = useContext1();

  useEffect(() => {
    setData1("Data-1");
    setData2("Data-2");
  }, []);

  return (
    <>
      <h2>Consumer</h2>
      <p>{data1}</p>
      <p>{data2}</p>
    </>
  );
}
```

## Integrate the consumer in the app

```js
// src / App.jsx
...
import Consumer from "./Consumer";
...
<Consumer />
...
```
