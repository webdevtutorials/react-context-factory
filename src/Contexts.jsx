import {
  createContext as reactCreateContext,
  useContext,
  useState,
  useMemo,
} from "react";

function createContext() {
  return reactCreateContext(undefined);
}

function createProvider(Context) {
  return function ProviderWrapper({ children }) {
    const [data, setData] = useState("No data");
    const value = useMemo(() => [data, setData], [data, setData]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
}

function createMasterProvider(providersArr) {
  return function MasterProvider({ children }) {
    return providersArr.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, children);
  };
}

function createHook(Context, name = "This context hook") {
  return function useContextHook() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(
        `${name} must be used within it's corresponding Provider`,
      );
    }
    return context;
  };
}

export const Context1 = createContext();
export const Provider1 = createProvider(Context1);
export const useContext1 = createHook(Context1, "useContext1");

export const Context2 = createContext();
export const Provider2 = createProvider(Context2);
export const useContext2 = createHook(Context2, "useContext2");

export const Context3 = createContext();
export const Provider3 = createProvider(Context3);
export const useContext3 = createHook(Context3, "useContext3");

export const AppProviders = createMasterProvider([
  Provider1,
  Provider2,
  Provider3,
]);

export function useAllContext() {
  return {
    c1: useContext1(),
    c2: useContext2(),
    c3: useContext3(),
  };
}
