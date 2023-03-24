import { createContext, useContext, useEffect, useState } from "react";
import { getFromStorage, setToStorage } from "../utils/storage";
import { createArraySoungs } from "../utils/auxFunc";

interface GlobalAlarmSettingsContext {
  alarmVolume: number;
  alarmRepeat: number;
  song: number;
  arraySongs: Array<HTMLAudioElement>;
  setAlarmVolume: (a: any) => void;
  setAlarmRepeat: (a: any) => void;
  setSong: (a: any) => void;
  setArraySongs: (a: any) => void;
}

const globalAlarmContext = createContext<GlobalAlarmSettingsContext>(
  {} as GlobalAlarmSettingsContext
);

const Provider = globalAlarmContext.Provider;

export const GlobalAlarmProvider = (props: any) => {
  const [alarmVolume, setAlarmVolume] = useState(0);
  const [alarmRepeat, setAlarmRepeat] = useState(0);
  const [song, setSong] = useState(0);
  const [arraySongs, setArraySongs] = useState(createArraySoungs());

  useEffect(() => {
    setAlarmVolume(
      getFromStorage("alarmVolume") || setToStorage("alarmVolume", 50)
    );
    setAlarmRepeat(
      getFromStorage("alarmRepeat") || setToStorage("alarmRepeat", 4)
    );
    setSong(getFromStorage("song") || setToStorage("song", 0));
  });

  return (
    <Provider
      value={{
        alarmVolume,
        alarmRepeat,
        song,
        arraySongs,
        setAlarmVolume,
        setAlarmRepeat,
        setSong,
        setArraySongs,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useGlobalAlarmContext = () => useContext(globalAlarmContext);
