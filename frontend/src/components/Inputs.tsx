import "../styles/input.css";

interface InputProps {
  text?: string;
  placeholder?: string;
  value?: any;
  type?: string;
  name?: string;
  onChange?: (valor: any) => void;
  onClick?: (valor: any) => void;
  className?: string;
  notBr?: boolean;
  id?: string;
  min?: string;
  max?: string;
  step?: string;
}

export default function Input(props: InputProps) {
  return (
    <div className={props.className}>
      {props.text ? <label>{props.text}</label> : null}
      {props.notBr ? null : <br />}
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        onClick={props.onClick}
        placeholder={props.placeholder}
        id={props.id}
        min={props.min}
        max={props.max}
        step={props.step}
      />
    </div>
  );
}
