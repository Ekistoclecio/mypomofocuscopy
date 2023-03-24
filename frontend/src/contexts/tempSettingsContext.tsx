import { createContext, useContext, useEffect, useState } from "react";
import { getFromStorage } from "../utils/storage";
import { useElementsContext } from "./switchElementsContext";

interface TempSettingsContext {
  tempPomodoro: number;
  tempShortBreak: number;
  tempLongBreak: number;
  tempAutoStartBreaks: boolean;
  tempAutoStartPomodoros: boolean;
  tempLongBreakInterval: number;
  tempAutoSwitchTask: boolean;
  tempAlarmVolume: number;
  tempAlarmRepeat: number;
  tempSong: number;
  tempBkColor: number;
  setTempPomodoro: (a: any) => void;
  setTempShortBreak: (a: any) => void;
  setTempLongBreak: (a: any) => void;
  setTempAutoStartBreaks: (a: any) => void;
  setTempAutoStartPomodoros: (a: any) => void;
  setTempLongBreakInterval: (a: any) => void;
  setTempAutoSwitchTask: (a: any) => void;
  setTempAlarmVolume: (a: any) => void;
  setTempAlarmRepeat: (a: any) => void;
  setTempSong: (a: any) => void;
  setTempBkColor: (a: any) => void;
}

const tempSettingsContext = createContext<TempSettingsContext>(
  {} as TempSettingsContext
);

const Provider = tempSettingsContext.Provider;

export const TempSettingsProvider = (props: any) => {
  const { settingsPopupElement } = useElementsContext();

  const [tempPomodoro, setTempPomodoro] = useState(0);
  const [tempShortBreak, setTempShortBreak] = useState(0);
  const [tempLongBreak, setTempLongBreak] = useState(0);
  const [tempAutoStartBreaks, setTempAutoStartBreaks] = useState(false);
  const [tempAutoStartPomodoros, setTempAutoStartPomodoros] = useState(false);
  const [tempAutoSwitchTask, setTempAutoSwitchTask] = useState(false);
  const [tempLongBreakInterval, setTempLongBreakInterval] = useState(0);
  const [tempAlarmVolume, setTempAlarmVolume] = useState(0);
  const [tempAlarmRepeat, setTempAlarmRepeat] = useState(0);
  const [tempSong, setTempSong] = useState(0);
  const [tempBkColor, setTempBkColor] = useState(0);

  useEffect(() => {
    setTempPomodoro(getFromStorage("timerPomodoro"));
    setTempShortBreak(getFromStorage("timerShortBreak"));
    setTempLongBreak(getFromStorage("timerLongBreak"));
    setTempAutoStartBreaks(getFromStorage("autoStartBreaks"));
    setTempAutoStartPomodoros(getFromStorage("autoStartPomodoros"));
    setTempLongBreakInterval(getFromStorage("longBreakInterval"));
    setTempAutoSwitchTask(getFromStorage("autoSwitchTask"));
    setTempAlarmRepeat(getFromStorage("alarmRepeat"));
    setTempAlarmVolume(getFromStorage("alarmVolume"));
    setTempSong(getFromStorage("song"));
    setTempBkColor(getFromStorage("bkColor"));
  }, [settingsPopupElement]);

  return (
    <Provider
      value={{
        tempPomodoro,
        tempShortBreak,
        tempLongBreak,
        tempAutoStartBreaks,
        tempAutoStartPomodoros,
        tempLongBreakInterval,
        tempAutoSwitchTask,
        tempAlarmVolume,
        tempAlarmRepeat,
        tempSong,
        tempBkColor,
        setTempPomodoro,
        setTempShortBreak,
        setTempLongBreak,
        setTempAutoStartBreaks,
        setTempAutoStartPomodoros,
        setTempLongBreakInterval,
        setTempAutoSwitchTask,
        setTempAlarmVolume,
        setTempAlarmRepeat,
        setTempSong,
        setTempBkColor,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useTempSettingsContext = () => useContext(tempSettingsContext);
