import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";
import Input from "./Inputs";
import "../styles/formRegister.css";
import useServerConection from "../hooks/useServeConection";

export default function FormRegister() {
  const { onChangeInputs, data, sendForm } = useServerConection();

  return (
    <form className="FormRegister">
      <Input
        type="text"
        text="EMAIL"
        name="email"
        placeholder="example@mail.com"
        onChange={onChangeInputs}
        value={data.email}
        className="formRegisterInput"
      />
      <Input
        type="password"
        text="PASSWORD"
        name="password"
        onChange={onChangeInputs}
        value={data.password}
        className="formRegisterInput"
      />
      <Input
        type="password"
        text="REPEAT PASSWORD"
        name="repeatPassword"
        onChange={onChangeInputs}
        value={data.repeatPassword}
        className="formRegisterInput"
      />
      <Button className="RegisterButton" onClick={sendForm}>
        Create an account
      </Button>
    </form>
  );
}
