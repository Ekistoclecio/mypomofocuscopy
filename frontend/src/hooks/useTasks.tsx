import { useEffect, useState } from "react";
import { useTasksContext } from "../contexts/tasksContext";
import { setToStorage } from "../utils/storage";
import TaskActive from "../components/TaskActive";
import EditActiveTask from "../components/EditActiveTask";
import { useElementsContext } from "../contexts/switchElementsContext";
import { useGlobalTimerContext } from "../contexts/globalTimerSettingsContext";

export default function useTasks() {
  const [tempTextTask, setTempTextTask] = useState("");
  const [tempEstPomodoro, setTempEstPomodoro] = useState<number>(0);
  const [tempActPomodoro, setTempActPomodoro] = useState<number>(0);

  const [taskDescription, setTaskDescription] = useState("");
  const [estPomodoro, setEstPomodoro] = useState(1);
  const [newTask, setNewTask] = useState({
    taskDescription,
    actPomodoro: 0,
    estPomodoro,
    statusTask: false,
    timeCreateTask: new Date().toString(),
  });

  const { timerPomodoro } = useGlobalTimerContext();

  const { setOptionsTasksPopupElement } = useElementsContext();

  const {
    existingTasks,
    extendedTask,
    setExtendedTask,
    setExistingTasks,
    setFocusTask,
    setTotalPomodoro,
  } = useTasksContext();

  useEffect(() => {
    const arrayTasks = existingTasks.length > 0 ? [...existingTasks] : [];
    if (extendedTask >= 0 && existingTasks.length > 0) {
      setTempTextTask(arrayTasks[extendedTask].taskDescription);
      setTempEstPomodoro(arrayTasks[extendedTask].estPomodoro);
      setTempActPomodoro(arrayTasks[extendedTask].actPomodoro);
    }
  }, [extendedTask, existingTasks]);

  useEffect(() => {
    setNewTask({
      taskDescription,
      actPomodoro: 0,
      estPomodoro,
      statusTask: false,
      timeCreateTask: new Date().toString(),
    });
  }, [taskDescription, estPomodoro]);

  function createTask() {
    setExistingTasks(() => {
      if (existingTasks.length > 0) {
        return setToStorage("existingTasks", [...existingTasks, newTask]);
      } else {
        return setToStorage("existingTasks", [newTask]);
      }
    });
    setTaskDescription("");
    setEstPomodoro(1);
  }

  function setActiveTasks() {
    const arrayTasks = existingTasks.length > 0 ? [...existingTasks] : [];
    const arrayActiveTasks = [];
    for (let i = 0; i < arrayTasks.length; i++) {
      let task =
        i === extendedTask ? (
          <EditActiveTask
            key={arrayTasks[i].timeCreateTask}
            text={arrayTasks[i].taskDescription}
            actPomodoro={arrayTasks[i].actPomodoro}
            estPomodoro={arrayTasks[i].estPomodoro}
            arrayPosition={i}
          />
        ) : (
          <TaskActive
            text={arrayTasks[i].taskDescription}
            actPomodoro={arrayTasks[i].actPomodoro}
            estPomodoro={arrayTasks[i].estPomodoro}
            completed={arrayTasks[i].statusTask}
            arrayPosition={i}
            key={arrayTasks[i].timeCreateTask}
          />
        );
      arrayActiveTasks.push(task);
    }
    return arrayActiveTasks;
  }

  function setStatusTask(i: number) {
    const arrayTasks = existingTasks.length > 0 ? [...existingTasks] : [];
    arrayTasks[i].statusTask = !arrayTasks[i].statusTask;
    setExistingTasks(setToStorage("existingTasks", [...existingTasks]));
  }

  function targetTask(target: any, i: number) {
    if (target.classList.contains("TaskActiveButton")) {
      setFocusTask(i);
      setToStorage("focusTask", i);
    }
  }

  function saveEditTask() {
    const arrayTasks = existingTasks.length > 0 ? [...existingTasks] : [];
    arrayTasks[extendedTask].taskDescription = tempTextTask;
    arrayTasks[extendedTask].estPomodoro = tempEstPomodoro;
    arrayTasks[extendedTask].actPomodoro = tempActPomodoro;
    setExistingTasks(setToStorage("existingTasks", arrayTasks));
    setExtendedTask(-1);
  }

  function deleteTask() {
    const arrayTasks =
      existingTasks.length > 0
        ? [...existingTasks].filter((e) => e != existingTasks[extendedTask])
        : [];
    setExistingTasks(setToStorage("existingTasks", arrayTasks));
    setExtendedTask(-1);
  }

  function clearFinishedTasks() {
    const arrayTasks =
      existingTasks.length > 0
        ? [...existingTasks].filter((e) => !e.statusTask)
        : [];
    setExistingTasks(setToStorage("existingTasks", arrayTasks));
    setOptionsTasksPopupElement(false);
  }

  function clearActPomodoros() {
    const arrayTasks =
      existingTasks.length > 0
        ? [...existingTasks].map((e) => {
            e.actPomodoro = 0;
            return e;
          })
        : [];
    setExistingTasks(setToStorage("existingTasks", arrayTasks));
    setOptionsTasksPopupElement(false);
  }

  function clearAllTasks() {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setExistingTasks(setToStorage("existingTasks", []));
      setFocusTask(-1);
      setExistingTasks(-1);
      setToStorage("focusTask", -1);
    }
    setOptionsTasksPopupElement(false);
  }

  function clearPomodoroCount() {
    if (window.confirm("Do you want to refresh the pomodoro count?")) {
      setTotalPomodoro(0);
      setToStorage("totalPomodoro", 0);
    }
  }

  function totalTimePomodoros() {
    let totalTimeTasks =
      existingTasks.length > 0
        ? [...existingTasks].reduce((total, cur) => {
            if (!cur.statusTask) {
              return total + Number(cur.estPomodoro);
            } else {
              return total + 0;
            }
          }, Number(0))
        : Number(0);
    return ((totalTimeTasks * timerPomodoro) / 60).toFixed(2);
  }

  function pomosForTasks() {
    let totalPomos = 0;
    let completedPomos = 0;
    for (let i = 0; i < existingTasks.length; i++) {
      completedPomos += Number(existingTasks[i].actPomodoro);
      totalPomos += Number(existingTasks[i].estPomodoro);
    }
    return `${completedPomos} / ${totalPomos}`;
  }

  return {
    taskDescription,
    estPomodoro,
    tempTextTask,
    tempEstPomodoro,
    tempActPomodoro,
    setTaskDescription,
    setEstPomodoro,
    createTask,
    setActiveTasks,
    setStatusTask,
    targetTask,
    setTempTextTask,
    setTempEstPomodoro,
    setTempActPomodoro,
    saveEditTask,
    deleteTask,
    clearFinishedTasks,
    clearActPomodoros,
    clearAllTasks,
    clearPomodoroCount,
    totalTimePomodoros,
    pomosForTasks,
  };
}
