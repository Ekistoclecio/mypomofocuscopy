import { useState } from "react";
import "../styles/timer.css";
import useTimer from "../hooks/useTimer";
import { useGlobalTimerContext } from "../contexts/globalTimerSettingsContext";

import Button from "./Button";

export default function Timer() {
  const { time, stopwatchOn, clockActive, selectTimer, setStopwatchOn } =
    useTimer();
  const { timerPomodoro, timerShortBreak, timerLongBreak } =
    useGlobalTimerContext();

  return (
    <div className="Timer">
      <div className="HeaderTimer">
        <Button
          className={`HeaderTimerButton ${
            clockActive === 0 ? "HeaderTimerButtonActive" : ""
          }`}
          onClick={() => selectTimer(0, timerPomodoro)}
        >
          Pomodoro
        </Button>
        <Button
          className={`HeaderTimerButton ${
            clockActive === 1 ? "HeaderTimerButtonActive" : ""
          }`}
          onClick={() => selectTimer(1, timerShortBreak)}
        >
          Short Break
        </Button>
        <Button
          className={`HeaderTimerButton ${
            clockActive === 2 ? "HeaderTimerButtonActive" : ""
          }`}
          onClick={() => selectTimer(2, timerLongBreak)}
        >
          Long Break
        </Button>
      </div>
      <div className="Clock">{time}</div>
      {stopwatchOn ? (
        <Button
          className="TimerButton TimerButtonActive"
          onClick={() => setStopwatchOn(false)}
        >
          PAUSE
        </Button>
      ) : (
        <Button className="TimerButton" onClick={() => setStopwatchOn(true)}>
          START
        </Button>
      )}
    </div>
  );
}
