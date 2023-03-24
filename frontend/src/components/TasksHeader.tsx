import { IconOptions } from "../utils/icones";
import "../styles/tasksActiveHeader.css";

import Button from "./Button";
import TaskOptionsPopup from "./TaskOptionsSelect";

import { useElementsContext } from "../contexts/switchElementsContext";

export default function TasksHeader(props: any) {
  const { optionsTasksPopupElement, setOptionsTasksPopupElement } =
    useElementsContext();

  return (
    <>
      <div className="TasksActiveHeader">
        <p>Tasks</p>
        <Button
          className="TasksOptionsButton"
          onClick={() => setOptionsTasksPopupElement((e: boolean) => !e)}
        >
          {IconOptions}
        </Button>
        {optionsTasksPopupElement ? <TaskOptionsPopup /> : <></>}
      </div>
      <hr />
    </>
  );
}
