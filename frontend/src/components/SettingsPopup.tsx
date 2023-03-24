import { IconX } from "../utils/icones";
import Alarm from "./Alarm";
import Button from "./Button";
import TimerSettingsPopup from "./TimerSettingsPopup";
import "../styles/settingsPopup.css";
import { useElementsContext } from "../contexts/switchElementsContext";
import useSaveSettings from "../hooks/useSaveSettings";
import { useTempSettingsContext } from "../contexts/tempSettingsContext";

export default function SettingsPopup(props: any) {
  const { setSettingsPopupElement } = useElementsContext();
  const { saveSettings } = useSaveSettings();
  const { setTempBkColor, tempBkColor } = useTempSettingsContext();

  return (
    <div className="BackgroundShadow">
      <div className="SettingsPopup">
        <div className="headerPopup">
          <p>SETTINGS</p>
          <Button
            className="closePopupButton"
            onClick={() => setSettingsPopupElement(false)}
          >
            {IconX}
          </Button>
        </div>
        <TimerSettingsPopup />
        <Alarm />
        <div className="colorThemes">
          <p>Color Themes</p>
          <div>
            <Button
              className={`${
                tempBkColor === 0
                  ? "activeColorBackgroundButton"
                  : "colorBackgroundButton"
              } BkColor0`}
              onClick={(e) => setTempBkColor(0)}
            />
            <Button
              className={`${
                tempBkColor === 1
                  ? "activeColorBackgroundButton"
                  : "colorBackgroundButton"
              } BkColor1`}
              onClick={(e) => setTempBkColor(1)}
            />
            <Button
              className={`${
                tempBkColor === 2
                  ? "activeColorBackgroundButton"
                  : "colorBackgroundButton"
              } BkColor2`}
              onClick={(e) => setTempBkColor(2)}
            />
          </div>
        </div>
      </div>
      <div className="settingsPopupFooter">
        <Button
          className="saveSettingsButton"
          onClick={() => {
            saveSettings();
            setSettingsPopupElement(false);
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );
}
