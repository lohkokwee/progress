import { createContext } from "react";

export type GlobalLoadingState = {
  isLoading: boolean,
  loaderTitle?: string,
  loaderText?: string
}

export const defaultGlobalLoadingState: GlobalLoadingState = {
  isLoading: false,
  loaderTitle: "",
  loaderText: ""
}

export type GlobalLoaderContextProps = {
  globalLoadingState: GlobalLoadingState,
  setGlobalLoadingState: (globalLoadingState: GlobalLoadingState) => void
  resetGlobalLoadingState: () => void
}

export const GlobalLoaderContext = createContext<GlobalLoaderContextProps>({
  globalLoadingState: defaultGlobalLoadingState,
  setGlobalLoadingState: () => null,
  resetGlobalLoadingState: () => { /* No values */ }
});