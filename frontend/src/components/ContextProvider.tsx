import { SwitchElementsProvider } from "../contexts/switchElementsContext";
import { GlobalTimerProvider } from "../contexts/globalTimerSettingsContext";
import { TempSettingsProvider } from "../contexts/tempSettingsContext";
import { GlobalAlarmProvider } from "../contexts/globalAlarmSettingsContext";
import { BackgroundProvider } from "../contexts/backgroundContext";
import { TasksContextProvider } from "../contexts/tasksContext";

export default function ContextProvider(props: any) {
  return (
    <BackgroundProvider>
      <SwitchElementsProvider>
        <GlobalTimerProvider>
          <GlobalAlarmProvider>
            <TasksContextProvider>
              <TempSettingsProvider>{props.children}</TempSettingsProvider>
            </TasksContextProvider>
          </GlobalAlarmProvider>
        </GlobalTimerProvider>
      </SwitchElementsProvider>
    </BackgroundProvider>
  );
}
