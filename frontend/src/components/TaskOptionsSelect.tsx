import { IconCheckSimple, IconTrash } from "../utils/icones";
import Button from "./Button";
import "../styles/taskOptionsSelect.css";
import useTasks from "../hooks/useTasks";

export default function TaskOptionsSelect(props: any) {
  const { clearFinishedTasks, clearActPomodoros, clearAllTasks } = useTasks();

  return (
    <div className="Select_TaskOptions">
      <Button
        className="TaskOptionsSelectButton"
        onClick={(e) => clearFinishedTasks()}
      >
        {IconTrash} Clear finished tasks
      </Button>
      <Button
        className="TaskOptionsSelectButton"
        onClick={(e) => clearActPomodoros()}
      >
        {IconCheckSimple} Clear act pomodoros
      </Button>
      <Button
        className="TaskOptionsSelectButton"
        onClick={(e) => clearAllTasks()}
      >
        {IconTrash} Clear all tasks
      </Button>
    </div>
  );
}
