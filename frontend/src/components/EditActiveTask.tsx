import Button from "./Button";
import Input from "./Inputs";
import { checkValue } from "../utils/auxFunc";
import useTasks from "../hooks/useTasks";
import "../styles/editActiveTask.css";
import { useTasksContext } from "../contexts/tasksContext";

interface PropsEditActiveTask {
  text: string;
  actPomodoro: number;
  estPomodoro: number;
  arrayPosition: number;
}

export default function EditActiveTask(props: PropsEditActiveTask) {
  const {
    tempTextTask,
    tempEstPomodoro,
    tempActPomodoro,
    setTempTextTask,
    setTempEstPomodoro,
    setTempActPomodoro,
    saveEditTask,
    deleteTask,
  } = useTasks();

  const { setExtendedTask } = useTasksContext();

  return (
    <div className="EditTask">
      <div className="bodyEditTask">
        <Input
          notBr={true}
          className="editTextTask"
          type="text"
          value={tempTextTask}
          onChange={(e) => setTempTextTask(e.target.value)}
        />
        <p>Act / Est Pomodoros</p>
        <div className="numberInputsEditActiveTask">
          <Input
            notBr={true}
            className="editValueActEstActiveTask"
            type="number"
            value={tempActPomodoro}
            onChange={(e) => setTempActPomodoro(checkValue(e.target.value, 0))}
          />
          &nbsp;/&nbsp;
          <Input
            notBr={true}
            className="editValueActEstActiveTask"
            type="number"
            value={tempEstPomodoro}
            onChange={(e) => setTempEstPomodoro(checkValue(e.target.value, 1))}
          />
        </div>
      </div>
      <div className="footerEditTask">
        <Button
          className="deleteActiveTaskButton"
          onClick={(e) => deleteTask()}
        >
          Delete
        </Button>
        <span>
          <Button
            className="addTaskCancelButton"
            onClick={(e) => setExtendedTask(-1)}
          >
            Cancel
          </Button>
          <Button className="addTaskSaveButton" onClick={(e) => saveEditTask()}>
            Save
          </Button>
        </span>
      </div>
    </div>
  );
}
