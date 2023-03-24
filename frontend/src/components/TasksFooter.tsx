import "../styles/tasksFooter.css";

interface PropsTasksFooter {
  pomos: string;
  finishHour: string;
  totalHours: string;
}

export default function TasksFooter(props: any) {
  return (
    <div className="TasksFooter">
      <p>
        Pomos: <span>{props.pomos}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Finish
        At:
        <span>{props.finishHour}</span>
        &nbsp;&nbsp; <span>({props.totalHours}h)</span>
      </p>
    </div>
  );
}
