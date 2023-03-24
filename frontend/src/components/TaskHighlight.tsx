import "../styles/taskHighlight.css";
import { useTasksContext } from "../contexts/tasksContext";
import useTasks from "../hooks/useTasks";

import Button from "./Button";

interface PropsTaskHighlight {
  text: string;
}

export default function TaskHighlight(props: PropsTaskHighlight) {
  const { totalPomodoro } = useTasksContext();
  const { clearPomodoroCount } = useTasks();
  return (
    <div className="TaskHighlight">
      <Button
        className="TaskHighlightButton"
        onClick={async () => clearPomodoroCount()}
      >
        #{totalPomodoro}
      </Button>
      <p>{props.text}</p>
    </div>
  );
}
