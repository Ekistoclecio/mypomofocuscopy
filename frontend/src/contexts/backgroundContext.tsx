import { createContext, useContext, useEffect, useState } from "react";
import { getFromStorage, setToStorage } from "../utils/storage";

interface BackgroundContext {
  bkColor: number;
  logged: boolean;
  setBkColor: (a: any) => void;
  setLogged: (a: any) => void;
}

const backgroundContext = createContext<BackgroundContext>(
  {} as BackgroundContext
);

const Provider = backgroundContext.Provider;

export const BackgroundProvider = (props: any) => {
  const [bkColor, setBkColor] = useState(0);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setBkColor(getFromStorage("bkColor") || setToStorage("bkColor", 0));
    setLogged(window.localStorage.getItem("LOGGED") == "true" || false);
  });

  return (
    <Provider
      value={{
        bkColor,
        logged,
        setLogged,
        setBkColor,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useBackGroundContext = () => useContext(backgroundContext);
