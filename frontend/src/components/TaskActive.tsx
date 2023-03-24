import { IconCheck, IconOptions } from "../utils/icones";
import "../styles/taskActive.css";

import Button from "./Button";
import { useTasksContext } from "../contexts/tasksContext";
import { setToStorage } from "../utils/storage";
import useTasks from "../hooks/useTasks";

interface PropsTaskActive {
  text: string;
  actPomodoro: number;
  estPomodoro: number;
  completed: boolean;
  arrayPosition: number;
}

export default function TaskActive(props: PropsTaskActive) {
  const { focusTask, setExtendedTask } = useTasksContext();
  const { setStatusTask, targetTask } = useTasks();

  return (
    <Button
      className={
        focusTask === props.arrayPosition
          ? "TaskActiveButton TaskActiveButtonSelect"
          : "TaskActiveButton"
      }
      onClick={(e) => targetTask(e.target, props.arrayPosition)}
    >
      <div id="left">
        <Button
          className={
            props.completed ? "checkTaskButtonChecked" : "checkTaskButton"
          }
          onClick={() => setStatusTask(props.arrayPosition)}
        >
          {IconCheck}
        </Button>
        {props.completed ? <s>{props.text}</s> : <p>{props.text}</p>}
      </div>
      <div id="right">
        <p>{`${props.actPomodoro}/${props.estPomodoro}`}</p>
        <Button
          className="editTaskButton"
          onClick={(e) => setExtendedTask(props.arrayPosition)}
        >
          {IconOptions}
        </Button>
      </div>
    </Button>
  );
}
