import { IconCheck } from "../utils/icones";
import FormLogin from "../components/FormLogin";
import "../styles/login.css";

export default function Login(props: any) {
  return (
    <div className="Login">
      <a href="/" id="logoLoginScreean">
        {IconCheck} MyPomofocusCopy
      </a>
      <h3 className="subtitleLogin">Login</h3>
      <FormLogin />
      <p>Do not have an account?</p>
      <a href="/sigup" className="linkSignup">
        Create account
      </a>
    </div>
  );
}
