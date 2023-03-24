import Input from "./Inputs";
import Button from "./Button";
import { useState } from "react";
import "../styles/addTask.css";
import { checkValue } from "../utils/auxFunc";
import useCreateNewTask from "../hooks/useTasks";

import { useElementsContext } from "../contexts/switchElementsContext";

export default function AddOrEditTask(props: any) {
  const { setNewTaskElement } = useElementsContext();

  const {
    taskDescription,
    estPomodoro,
    setTaskDescription,
    setEstPomodoro,
    createTask,
  } = useCreateNewTask();

  return (
    <div className="AddTask">
      <div className="bodyTask">
        <Input
          notBr={true}
          className="addTextTask"
          type="text"
          placeholder="What are you working on?"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <Input
          text="Est Pomodoros:"
          notBr={true}
          className="addEstPomodorosTask"
          type="number"
          value={estPomodoro}
          onChange={(e) => setEstPomodoro(checkValue(e.target.value, 1))}
        />
      </div>
      <div className="footerAddTask">
        <Button
          className="addTaskCancelButton"
          onClick={() => {
            setTaskDescription("");
            setEstPomodoro(1);
            setNewTaskElement(false);
          }}
        >
          Cancel
        </Button>
        <Button className="addTaskSaveButton" onClick={(e) => createTask()}>
          Save
        </Button>
      </div>
    </div>
  );
}
