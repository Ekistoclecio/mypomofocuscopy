import Button from "./Button";
import "../styles/selectSettingsPopup.css";
import { useTempSettingsContext } from "../contexts/tempSettingsContext";
import { useGlobalAlarmContext } from "../contexts/globalAlarmSettingsContext";

export default function SelectSongPopup(props: any) {
  const { arraySongs } = useGlobalAlarmContext();
  const { setTempSong, tempAlarmVolume } = useTempSettingsContext();

  return (
    <div className="SelectSettingsPopup">
      <Button
        className="OptionSelectSoungButton"
        onClick={() => {
          setTempSong(0);
          arraySongs[0].volume = tempAlarmVolume / 100;
          arraySongs[0].play();
        }}
      >
        Sound1
      </Button>
      <Button
        className="OptionSelectSoungButton"
        onClick={() => {
          setTempSong(1);
          arraySongs[1].volume = tempAlarmVolume / 100;
          arraySongs[1].play();
        }}
      >
        Sound2
      </Button>
      <Button
        className="OptionSelectSoungButton"
        onClick={() => {
          setTempSong(2);
          arraySongs[2].volume = tempAlarmVolume / 100;
          arraySongs[2].play();
        }}
      >
        Sound3
      </Button>
      <Button
        className="OptionSelectSoungButton"
        onClick={() => {
          setTempSong(3);
          arraySongs[3].volume = tempAlarmVolume / 100;
          arraySongs[3].play();
        }}
      >
        Sound4
      </Button>
    </div>
  );
}
