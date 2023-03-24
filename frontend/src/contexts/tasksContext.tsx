import { createContext, useContext, useEffect, useState } from "react";
import { getFromStorage, setToStorage } from "../utils/storage";

interface ObjectTask {
  taskDescription: string;
  actPomodoro: number;
  estPomodoro: number;
  statusTask: boolean;
  timeCreateTask: string;
}

interface TasksContext {
  totalPomodoro: number;
  existingTasks: Array<ObjectTask>;
  focusTask: number;
  extendedTask: number;
  setTotalPomodoro: (e: any) => void;
  setExistingTasks: (e: any) => void;
  setFocusTask: (e: any) => void;
  setExtendedTask: (e: any) => void;
}

const tasksContext = createContext<TasksContext>({} as TasksContext);

const Provider = tasksContext.Provider;

export const TasksContextProvider = (props: any) => {
  const [totalPomodoro, setTotalPomodoro] = useState(0);
  const [existingTasks, setExistingTasks] = useState(
    getFromStorage("existingTasks") || setToStorage("existingTasks", [])
  );
  const [focusTask, setFocusTask] = useState(-1);
  const [extendedTask, setExtendedTask] = useState(-1);

  useEffect(() => {
    setTotalPomodoro(
      getFromStorage("totalPomodoro") || setToStorage("totalPomodoro", 0)
    );
    setFocusTask(getFromStorage("focusTask") || setToStorage("focusTask", 0));
  });

  return (
    <Provider
      value={{
        totalPomodoro,
        existingTasks,
        focusTask,
        extendedTask,
        setTotalPomodoro,
        setExistingTasks,
        setFocusTask,
        setExtendedTask,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useTasksContext = () => useContext(tasksContext);
