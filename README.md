# React Context API with Multiple Providers and Factory Functions.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

A quick-start guide to scaffolding a new React-Vite project with scalable and safe React Context API using factory functions, custom hooks, and provider composition.

---

### To run the app:

```bash
cd react-context-factory
yarn install
yarn dev
```

### To build from scratch start a new Vite-React app:

```bash
cd tutorials

yarn create vite react-context-factory --template react
cd react-context-factory
```

### Initiate version control:

```bash
git init
git add .
git commit -m "Empty app"
git branch -m master main
```

### Upload to GitHub:

```bash
gh auth status
gh repo create react-context-factory --public --source=. --remote=origin --push
git remote -v
```

### Create contexts factory function and contexts:

```js
// src / DataContexts.jsx

function createSafeContext() {
  return createContext(undefined);
}

const Data1Context = createSafeContext();
const Data2Context = createSafeContext();
const Data3Context = createSafeContext();
```

### Create provider factory function and providers:

```js
// src / DataContexts.jsx

function createDataProvider(Context) {
  return ({ children }) => {
    const [data, setData] = useState("No data.");
    const value = useMemo(() => ({ data, setData }), [data, setData]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
}

const Data1Provider = createDataProvider(Data1Context);
const Data2Provider = createDataProvider(Data2Context);
const Data3Provider = createDataProvider(Data3Context);
```

### Create provider composing function and compose providers:

```js
// src / DataContexts.jsx

function composeProviders(providers) {
  return ({ children }) => {
    return providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, children);
  };
}

export const AppProviders = composeProviders([
  Data1Provider,
  Data2Provider,
  Data3Provider,
]);
```

### Create context hook factory function and the hooks:

```js
// src / DataContexts.jsx

function createContextHook(Context, providerName, hookName) {
  return () => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(`${hookName} must be used within ${providerName}`);
    }
    return context;
  };
}

const useData1 = createContextHook(Data1Context, "Data1Provider", "useData1");
const useData2 = createContextHook(Data2Context, "Data2Provider", "useData2");
const useData3 = createContextHook(Data3Context, "Data3Provider", "useData3");
```

### Export all hooks together:

```js
// src / DataContexts.jsx

export function useData() {
  return {
    data1: useData1(),
    data2: useData2(),
    data3: useData3(),
  };
}
```

### Create a component, import the hooks and use the data:

```js
// src / MyComponent.jsx

import { useEffect } from "react";
import { useData } from "./DataContexts";

export default function MyComponent() {
  const { data1, data2, data3 } = useData();

  useEffect(() => {
    data1.setData("Data-1");
    data2.setData("Data-2");
    data3.setData("Data-3");
  }, []);

  return (
    <>
      <h2>My Component</h2>

      <p>{data1.data}</p>
      <p>{data2.data}</p>
      <p>{data3.data}</p>
    </>
  );
}
```

### Wrap the app in the composed providers:

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

### Integrate the component in the app:

```js
// src / App.jsx
...
import MyComponent from "./MyComponent";
...
<MyComponent />
...
```
