import Button from "./Button";
import Input from "./Inputs";
import "../styles/alarm.css";
import { useElementsContext } from "../contexts/switchElementsContext";
import { IconArrowDown } from "../utils/icones";
import SelectSongPopup from "./SelectSongPopup";
import { useTempSettingsContext } from "../contexts/tempSettingsContext";
import { useGlobalAlarmContext } from "../contexts/globalAlarmSettingsContext";

export default function Alarm(props: any) {
  const { soundSelectPopupElement, setSoundSelectPopupElement } =
    useElementsContext();
  const {
    tempAlarmRepeat,
    tempAlarmVolume,
    tempSong,
    setTempAlarmRepeat,
    setTempAlarmVolume,
  } = useTempSettingsContext();

  const { arraySongs } = useGlobalAlarmContext();

  return (
    <div className="Alarm">
      <div className="selectAlarm">
        <p>Alarm Sound</p>
        <Button
          className="openSelectButton"
          onClick={() => setSoundSelectPopupElement((e: boolean) => !e)}
        >
          {"Sound" + (tempSong + 1)}
          {IconArrowDown}
        </Button>
        {soundSelectPopupElement ? <SelectSongPopup /> : <></>}
      </div>
      <div className="alarmSetting">
        <div className="volumeAlarmSetting">
          <p>{tempAlarmVolume}</p>
          <Input
            className="sliderBar"
            type="range"
            id="weigth"
            min="0"
            max="100"
            step="1"
            value={tempAlarmVolume}
            onChange={(e) => {
              setTempAlarmVolume(e.target.value);
            }}
            onClick={(e) => {
              arraySongs[tempSong].volume = tempAlarmVolume / 100;
              arraySongs[tempSong].play();
            }}
          />
        </div>
        <div className="alarmRepeat">
          <p>Repeat</p>
          <Input
            className="numberAlarmRepeat"
            type="number"
            value={tempAlarmRepeat}
            notBr={true}
            onChange={(e) => setTempAlarmRepeat(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
