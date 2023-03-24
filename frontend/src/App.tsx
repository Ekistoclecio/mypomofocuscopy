import "./styles/app.css";
import { BrowserRouter } from "react-router-dom";
import { useBackGroundContext } from "./contexts/backgroundContext";

import Routes from "./Routes/Routes";

export default function App() {
  const { bkColor } = useBackGroundContext();
  return (
    <BrowserRouter>
      <div className={`App ${"BkColor" + bkColor}`}>
        <Routes />
      </div>
    </BrowserRouter>
  );
}
