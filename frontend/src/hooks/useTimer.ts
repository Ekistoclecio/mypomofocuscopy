import { getFromStorage, setToStorage } from "../utils/storage";
import { useState, useEffect } from "react";
import { useGlobalTimerContext } from "../contexts/globalTimerSettingsContext";
import { sleep } from "../utils/auxFunc";
import { useGlobalAlarmContext } from "../contexts/globalAlarmSettingsContext";
import { useTasksContext } from "../contexts/tasksContext";

export default function useTimer() {
  const { timerPomodoro, timerShortBreak, timerLongBreak, longBreakInterval } =
    useGlobalTimerContext();

  const {
    totalPomodoro,
    existingTasks,
    focusTask,
    setExistingTasks,
    setTotalPomodoro,
  } = useTasksContext();

  const { song, alarmVolume, alarmRepeat, arraySongs } =
    useGlobalAlarmContext();

  const [time, setTime] = useState(convertTime(timerPomodoro));
  const [clockActive, setClockActive] = useState(0);
  const [stopwatchOn, setStopwatchOn] = useState(false);

  function convertTime(val: number) {
    const minutes = Math.floor(val);
    const seconds = Math.floor(60 * (val % 1));
    return `${("00" + minutes).slice(-2)}:${("00" + seconds).slice(-2)}`;
  }

  function selectTimer(val: number, timeDefault: number) {
    if (val != clockActive) {
      setClockActive(val);
      setTime(convertTime(timeDefault));
    }
  }

  function playSong() {
    arraySongs[song].volume = alarmVolume / 100;
    arraySongs[song].load();
    arraySongs[song].onloadeddata = async function () {
      for (let i = 0; i < alarmRepeat; i++) {
        arraySongs[song].play();
        await sleep(Math.ceil(arraySongs[song].duration) + 1);
      }
    };
  }

  function nextTimer() {
    const localTotalPomodoro = totalPomodoro;
    const arrayTasks = existingTasks.length > 0 ? [...existingTasks] : [];
    if (clockActive === 0) {
      setTotalPomodoro(setToStorage("totalPomodoro", totalPomodoro + 1));
      if (arrayTasks.length > 0) {
        arrayTasks[focusTask].actPomodoro++;
      }
      setExistingTasks(setToStorage("existingTasks", arrayTasks));
      playSong();
      if (
        longBreakInterval === localTotalPomodoro + 1 ||
        (localTotalPomodoro + 1 > longBreakInterval &&
          (localTotalPomodoro + 1) % longBreakInterval === 0)
      ) {
        setClockActive(2);
        setStopwatchOn(getFromStorage("autoStartBreaks"));
        setTime(convertTime(getFromStorage("timerLongBreak")));
      } else {
        setClockActive(1);
        setStopwatchOn(getFromStorage("autoStartBreaks"));
        setTime(convertTime(getFromStorage("timerShortBreak")));
      }
    } else {
      setClockActive(0);
      setStopwatchOn(getFromStorage("autoStartPomodoros"));
      setTime(convertTime(getFromStorage("timerPomodoro")));
    }
  }

  useEffect(() => {
    if (clockActive === 0) {
      setTime(convertTime(timerPomodoro));
    } else if (clockActive === 1) {
      setTime(convertTime(timerShortBreak));
    } else {
      setTime(convertTime(timerLongBreak));
    }
  }, [timerPomodoro, timerShortBreak, timerLongBreak]);

  useEffect(() => {
    const stopwatch = setInterval(() => {
      const [minutes, seconds] = time.split(":").map((e) => parseInt(e));
      let newMinutes = minutes;
      let newSeconds = seconds - 1;
      if (stopwatchOn) {
        if (newSeconds <= 0 && newMinutes <= 0) {
          nextTimer();
          return null;
        } else if (newSeconds < 0 && newMinutes > 0) {
          newMinutes = minutes - 1;
          newSeconds = 59;
        }
        setTime((e) => {
          return (
            ("00" + newMinutes).slice(-2) + ":" + ("00" + newSeconds).slice(-2)
          );
        });
      }
    }, 10);
    return () => clearInterval(stopwatch);
  }, [stopwatchOn, time]);

  return { time, stopwatchOn, clockActive, selectTimer, setStopwatchOn };
}
