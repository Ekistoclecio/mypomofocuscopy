import "../styles/button.css";

interface ButtonProps {
  className?: string;
  children?: any;
  onClick?: (e: any) => void;
  id?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button id={props.id} className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
