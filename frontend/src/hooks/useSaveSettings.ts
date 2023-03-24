import { useTempSettingsContext } from "../contexts/tempSettingsContext";
import { useGlobalTimerContext } from "../contexts/globalTimerSettingsContext";
import { setToStorage } from "../utils/storage";
import { useBackGroundContext } from "../contexts/backgroundContext";
import { useGlobalAlarmContext } from "../contexts/globalAlarmSettingsContext";

export default function useSettings() {
  const {
    setTimerPomodoro,
    setTimerShortBreak,
    setTimerLongBreak,
    setAutoStartBreaks,
    setAutoStartPomodoros,
    setLongBreakInterval,
    setAutoSwitchTask,
  } = useGlobalTimerContext();

  const { setAlarmVolume, setAlarmRepeat, setSong } = useGlobalAlarmContext();

  const { setBkColor } = useBackGroundContext();

  const {
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
  } = useTempSettingsContext();

  function saveSettings() {
    setTimerPomodoro(tempPomodoro);
    setTimerShortBreak(tempShortBreak);
    setTimerLongBreak(tempLongBreak);
    setAutoStartBreaks(tempAutoStartBreaks);
    setAutoStartPomodoros(tempAutoStartPomodoros);
    setLongBreakInterval(tempLongBreakInterval);
    setAutoSwitchTask(tempAutoSwitchTask);
    setBkColor(tempBkColor);
    setAlarmRepeat(tempAlarmRepeat);
    setAlarmVolume(tempAlarmVolume);
    setSong(tempSong);

    setToStorage("timerPomodoro", tempPomodoro);
    setToStorage("timerShortBreak", tempShortBreak);
    setToStorage("timerLongBreak", tempLongBreak);
    setToStorage("autoStartBreaks", tempAutoStartBreaks);
    setToStorage("autoStartPomodoros", tempAutoStartPomodoros);
    setToStorage("longBreakInterval", tempLongBreakInterval);
    setToStorage("autoSwitchTask", tempAutoSwitchTask);
    setToStorage("bkColor", tempBkColor);
    setToStorage("alarmVolume", tempAlarmVolume);
    setToStorage("alarmRepeat", tempAlarmRepeat);
    setToStorage("song", tempSong);
  }

  return { saveSettings };
}
