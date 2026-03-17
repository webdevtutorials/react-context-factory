import { useState, useMemo, useContext, createContext } from "react";

function createSafeContext() {
  return createContext(undefined);
}

const Data1Context = createSafeContext();
const Data2Context = createSafeContext();
const Data3Context = createSafeContext();

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

export function useData() {
  return {
    data1: useData1(),
    data2: useData2(),
    data3: useData3(),
  };
}
