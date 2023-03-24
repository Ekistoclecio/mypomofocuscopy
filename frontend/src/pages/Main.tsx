import React from "react";
import "../styles/main.css";
import { useElementsContext } from "../contexts/switchElementsContext";

import HeaderMain from "../components/HeaderMain";
import Timer from "../components/Timer";
import Tasks from "../components/Tasks";
import SettingsPopup from "../components/SettingsPopup";

export default function Login(props: any) {
  const { settingsPopupElement } = useElementsContext();

  return (
    <div id="Main">
      {settingsPopupElement ? <SettingsPopup /> : <></>}
      <HeaderMain />
      <Timer />
      <Tasks />
    </div>
  );
}
