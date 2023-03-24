import "../styles/switch.css";

interface PropsSwitch {
  text: string;
  checked?: boolean;
  onChange?: (e: any) => void;
}

export default function Switch(props: PropsSwitch) {
  return (
    <div className="Switch">
      <p>{props.text}</p>
      <label className="labelSwitch">
        <input
          className="inputSwitch"
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
        />
        <span className="slider round" />
      </label>
    </div>
  );
}
