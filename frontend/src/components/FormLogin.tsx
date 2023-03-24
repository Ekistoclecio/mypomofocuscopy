import Input from "./Inputs";
import Button from "./Button";
import "../styles/formLogin.css";
import useServerConection from "../hooks/useServeConection";

export default function Form(props: any) {
  const { onChangeInputs, data, sendForm } = useServerConection();

  return (
    <form className="FormLogin">
      <Input
        type="text"
        text="EMAIL"
        name="email"
        placeholder="example@mail.com"
        onChange={onChangeInputs}
        value={data.email}
        className="formLoginInput"
      />
      <Input
        type="password"
        text="PASSWORD"
        name="password"
        onChange={onChangeInputs}
        value={data.password}
        className="formLoginInput"
      />
      <Button
        className="loginButton"
        onClick={async (e) => {
          await sendForm(e);
        }}
      >
        Log in with Email
      </Button>
    </form>
  );
}
