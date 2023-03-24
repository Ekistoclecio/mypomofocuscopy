import React from "react";
import { IconCheck, IconUser, IconSetting } from "../utils/icones";
import Button from "./Button";
import "../styles/headerMain.css";

import { useElementsContext } from "../contexts/switchElementsContext";
import { useBackGroundContext } from "../contexts/backgroundContext";

export default function HeaderMain() {
  const { setSettingsPopupElement } = useElementsContext();
  const { logged, setLogged } = useBackGroundContext();

  function logout() {
    if (window.confirm("Want to logout?") == true) {
      window.localStorage.setItem("LOGGED", JSON.stringify(false));
      window.localStorage.removeItem("USER_TOKEN");
      setLogged(false);
    }
  }

  return (
    <div className="HeaderMain">
      <Button
        className="LogoHeaderMainButton"
        onClick={() => window.location.reload()}
      >
        <span id="Logo">{IconCheck}</span> MyPomofocusCopy
      </Button>
      <span id="options">
        <Button
          className="HeaderMainButton"
          onClick={() => setSettingsPopupElement(true)}
        >
          {IconSetting} <span>Setting</span>
        </Button>
        <Button
          className="HeaderMainButton"
          onClick={() =>
            logged ? logout() : (window.location.href = "/sigin")
          }
        >
          {IconUser}
          <span>{logged ? "Logout?" : "Login"}</span>
        </Button>
      </span>
    </div>
  );
}
