import Input from "./Inputs";
import Switch from "./Switch";
import "../styles/timerSettingsPopup.css";
import { checkValue } from "../utils/auxFunc";
import { useTempSettingsContext } from "../contexts/tempSettingsContext";

export default function TimerSettingsPopup(props: any) {
  const {
    tempPomodoro,
    tempShortBreak,
    tempLongBreak,
    tempAutoStartBreaks,
    tempAutoStartPomodoros,
    tempLongBreakInterval,
    tempAutoSwitchTask,
    setTempPomodoro,
    setTempShortBreak,
    setTempLongBreak,
    setTempAutoStartBreaks,
    setTempAutoStartPomodoros,
    setTempLongBreakInterval,
    setTempAutoSwitchTask,
  } = useTempSettingsContext();

  return (
    <div className="TimerSettingsPopup">
      <p>Time(minutes)</p>
      <div className="TimerInputs">
        <Input
          className="InputMinutesSettingsPopup"
          text="Pomodoro"
          type="number"
          value={tempPomodoro}
          notBr={true}
          onChange={(e) => setTempPomodoro(checkValue(e.target.value, 0.1))}
        />
        <Input
          className="InputMinutesSettingsPopup"
          text="Short Break"
          type="number"
          value={tempShortBreak}
          notBr={true}
          onChange={(e) => setTempShortBreak(checkValue(e.target.value, 0.1))}
        />
        <Input
          className="InputMinutesSettingsPopup"
          text="Long Break"
          type="number"
          value={tempLongBreak}
          notBr={true}
          onChange={(e) => setTempLongBreak(checkValue(e.target.value, 0.1))}
        />
      </div>
      <Switch
        text="Auto Start Breaks"
        onChange={(e) => setTempAutoStartBreaks(!tempAutoStartBreaks)}
        checked={tempAutoStartBreaks}
      />
      <Switch
        text="Auto Start Pomodoros"
        onChange={(e) => setTempAutoStartPomodoros(!tempAutoStartPomodoros)}
        checked={tempAutoStartPomodoros}
      />
      <Switch
        text="Auto Switch Tasks"
        onChange={(e) => setTempAutoSwitchTask(!tempAutoSwitchTask)}
        checked={tempAutoSwitchTask}
      />
      <Input
        className="setLongBreak"
        text="Long Break interval"
        type="number"
        value={tempLongBreakInterval}
        notBr={true}
        onChange={(e) =>
          setTempLongBreakInterval(checkValue(e.target.value, 1))
        }
      />
    </div>
  );
}
