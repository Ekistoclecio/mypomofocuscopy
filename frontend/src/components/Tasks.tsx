import "../styles/tasks.css";

import TaskHighlight from "./TaskHighlight";
import TasksHeader from "./TasksHeader";
import Button from "./Button";
import AddTask from "./AddTask";
import TasksFooter from "./TasksFooter";
import { useTasksContext } from "../contexts/tasksContext";

import { useElementsContext } from "../contexts/switchElementsContext";
import useTasks from "../hooks/useTasks";

export default function Tasks(props: any) {
  const { newTaskElement, setNewTaskElement } = useElementsContext();
  const { setActiveTasks, totalTimePomodoros, pomosForTasks } = useTasks();
  const { existingTasks } = useTasksContext();

  return (
    <div className="Tasks">
      <TaskHighlight text="Time for a break!" />
      <TasksHeader />
      {setActiveTasks()}
      {newTaskElement ? (
        <AddTask />
      ) : (
        <Button
          className="addTaskButton"
          onClick={() => setNewTaskElement(true)}
        >
          Add Task
        </Button>
      )}
      {existingTasks.length > 0 ? (
        <TasksFooter
          totalHours={totalTimePomodoros()}
          pomos={pomosForTasks()}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
