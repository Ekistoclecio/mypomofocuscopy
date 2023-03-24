import { getFromStorage, setToStorage } from "../utils/storage";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function useServerConection() {
  const [data, setData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [localConfig, setLocalConfig] = useState(
    window.localStorage.getItem("prototipoPomofocus")
  );

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const setConfig = async (token: string, config: any) => {
    try {
      await fetch("http://localhost:3001/setConfig", {
        method: "POST",
        body: config,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  function serverResponseHandling(data: any) {
    if (data.auth) {
      window.localStorage.setItem("LOGGED", JSON.stringify(true));
      window.localStorage.setItem("USER_TOKEN", data.token);
      if (Object.keys(data.config).length === 0) {
        setConfig(data.token, localConfig);
      } else {
        window.localStorage.setItem(
          "prototipoPomofocus",
          JSON.stringify(data.config)
        );
      }
      window.location.href = "/";
    } else if (data.register) {
      window.location.href = "/sigin";
    } else {
      alert(data.message);
    }
  }

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    const route =
      window.location.href.indexOf("/sigin") > -1 ? "/sigin" : "/sigup";
    if (
      (route === "/sigin" && data.password && data.email) ||
      (route === "/sigup" && data.email && data.password && data.repeatPassword)
    ) {
      try {
        await fetch(`http://localhost:3001${route}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => serverResponseHandling(data));
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("All fields need to be filled in!");
    }
  };

  return {
    data,
    localConfig,
    setLocalConfig,
    setData,
    onChangeInputs,
    setConfig,
    sendForm,
  };
}
