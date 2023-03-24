import { createContext, useContext, useEffect, useState } from "react";
import { getFromStorage, setToStorage } from "../utils/storage";

interface GlobalTimerSettingsContext {
  timerPomodoro: number;
  timerShortBreak: number;
  timerLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  autoSwitchTask: boolean;
  longBreakInterval: number;
  setTimerPomodoro: (e: any) => void;
  setTimerShortBreak: (e: any) => void;
  setTimerLongBreak: (e: any) => void;
  setAutoStartBreaks: (e: any) => void;
  setAutoStartPomodoros: (e: any) => void;
  setLongBreakInterval: (e: any) => void;
  setAutoSwitchTask: (e: any) => void;
}

const globalTimerContext = createContext<GlobalTimerSettingsContext>(
  {} as GlobalTimerSettingsContext
);

const Provider = globalTimerContext.Provider;

export const GlobalTimerProvider = (props: any) => {
  const [timerPomodoro, setTimerPomodoro] = useState(0);
  const [timerShortBreak, setTimerShortBreak] = useState(0);
  const [timerLongBreak, setTimerLongBreak] = useState(0);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  const [autoSwitchTask, setAutoSwitchTask] = useState(false);
  const [longBreakInterval, setLongBreakInterval] = useState(0);

  useEffect(() => {
    setTimerPomodoro(
      getFromStorage("timerPomodoro") || setToStorage("timerPomodoro", 25)
    );
    setTimerShortBreak(
      getFromStorage("timerShortBreak") || setToStorage("timerShortBreak", 5)
    );
    setTimerLongBreak(
      getFromStorage("timerLongBreak") || setToStorage("timerLongBreak", 15)
    );
    setAutoStartPomodoros(
      getFromStorage("autoStartBreaks") ||
        setToStorage("autoStartBreaks", false)
    );
    setAutoStartBreaks(
      getFromStorage("autoStartPomodoros") ||
        setToStorage("autoStartPomodoros", false)
    );
    setLongBreakInterval(
      getFromStorage("longBreakInterval") ||
        setToStorage("longBreakInterval", 4)
    );
    setAutoSwitchTask(
      getFromStorage("autoSwitchTask") || setToStorage("autoSwitchTask", false)
    );
  });

  return (
    <Provider
      value={{
        timerPomodoro,
        timerShortBreak,
        timerLongBreak,
        autoStartBreaks,
        autoStartPomodoros,
        longBreakInterval,
        autoSwitchTask,
        setTimerPomodoro,
        setTimerShortBreak,
        setTimerLongBreak,
        setAutoStartBreaks,
        setAutoStartPomodoros,
        setLongBreakInterval,
        setAutoSwitchTask,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useGlobalTimerContext = () => useContext(globalTimerContext);
