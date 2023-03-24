async function syncSettings(token: string, config: any) {
  try {
    await fetch("http://localhost:3001/setConfig", {
      method: "POST",
      body: JSON.stringify(config),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        sessionExpired(data);
        console.log(data);
      });
  } catch (err) {
    console.log(err);
  }
}

function sessionExpired(data: any) {
  console.log(data);
  if (!data.auth) {
    window.localStorage.setItem("LOGGED", JSON.stringify(false));
    window.localStorage.removeItem("USER_TOKEN");
    window.location.href = "/sigin";
    alert("Session Expired!");
  }
}

export const getFromStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const prototipoPomofocus =
      window.localStorage.getItem("prototipoPomofocus");
    if (prototipoPomofocus) {
      return JSON.parse(prototipoPomofocus)[key];
    } else return null;
  }
};

export const setToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    const prototipoPomofocus =
      window.localStorage.getItem("prototipoPomofocus");
    if (prototipoPomofocus) {
      const newElement = JSON.parse(prototipoPomofocus);
      newElement[key] = value;
      window.localStorage.setItem(
        "prototipoPomofocus",
        JSON.stringify(newElement)
      );
      if (window.localStorage.getItem("LOGGED") == "true") {
        let token = window.localStorage.getItem("USER_TOKEN");
        if (token) {
          syncSettings(token, newElement);
        }
      }
    } else {
      const newObj = {};
      // @ts-ignore
      newObj[key] = value;
      window.localStorage.setItem("prototipoPomofocus", JSON.stringify(newObj));
    }

    return value;
  }
};
