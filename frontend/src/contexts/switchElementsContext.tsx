import { createContext, useContext, useState } from "react";

interface SwitchElementsContext {
  settingsPopupElement: boolean;
  soundSelectPopupElement: boolean;
  optionsTasksPopupElement: boolean;
  newTaskElement: boolean;
  setSettingsPopupElement: (a: any) => void;
  setSoundSelectPopupElement: (a: any) => void;
  setOptionsTasksPopupElement: (a: any) => void;
  setNewTaskElement: (a: any) => void;
}

const elementsContext = createContext<SwitchElementsContext>(
  {} as SwitchElementsContext
);

const Provider = elementsContext.Provider;

export const SwitchElementsProvider = (props: any) => {
  const [settingsPopupElement, setSettingsPopupElement] = useState(false);
  const [soundSelectPopupElement, setSoundSelectPopupElement] = useState(false);
  const [optionsTasksPopupElement, setOptionsTasksPopupElement] =
    useState(false);
  const [newTaskElement, setNewTaskElement] = useState(false);

  return (
    <Provider
      value={{
        settingsPopupElement,
        soundSelectPopupElement,
        optionsTasksPopupElement,
        newTaskElement,
        setSettingsPopupElement,
        setSoundSelectPopupElement,
        setOptionsTasksPopupElement,
        setNewTaskElement,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useElementsContext = () => useContext(elementsContext);
