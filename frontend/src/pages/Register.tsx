import { IconCheck } from "../utils/icones";
import FormRegister from "../components/FormRegister";
import "../styles/register.css";

export default function Login(props: any) {
  return (
    <div className="Register">
      <a href="/" id="logoRegisterScreen">
        {IconCheck} MyPomofocusCopy
      </a>
      <h3 className="subtitleRegister">Create Account</h3>
      <FormRegister />
      <p>Already have an account?</p>
      <a href="/sigin" className="linkSignin">
        Log in
      </a>
    </div>
  );
}
