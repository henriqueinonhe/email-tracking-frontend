import Head from "next/head";
import { useEffect, useId, useState } from "react";
import { login as domainLogin } from "@/domain/user/login";
import { useRouter } from "next/router";
import { Urls } from "@/view/Urls";
import { useEffectEvent } from "@/view/hooks/useEffectEvent";
import { useProfile } from "@/view/user/useProfile";

type LoginStatus =
  | "Initial"
  | "InvalidCredentials"
  | "UnexpectedError"
  | "Loading"
  | "Success";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState<LoginStatus>("Initial");

  const emailInputId = useId();
  const passwordInputId = useId();

  const router = useRouter();

  const { profileStatus } = useProfile();

  const redirectToDashboardWhenLogggedIn = useEffectEvent(
    (profileStatus: "error" | "pending" | "success") => {
      if (profileStatus === "success") {
        router.push(Urls.dashboard());
      }
    },
  );

  useEffect(() => {
    redirectToDashboardWhenLogggedIn(profileStatus);
  }, [profileStatus, redirectToDashboardWhenLogggedIn]);

  const login = async () => {
    setLoginStatus("Loading");
    const result = await domainLogin(email, password);

    if (result === "InvalidCredentials") {
      setLoginStatus("InvalidCredentials");
      return;
    }

    if (result === "UnexpectedError") {
      setLoginStatus("UnexpectedError");
      return;
    }

    setLoginStatus("Success");
    router.push(Urls.dashboard());
  };

  const loginStatusMessageMatrix: Record<LoginStatus, string> = {
    Initial: "",
    Loading: "Loading...",
    InvalidCredentials: "Email ou senha inválido!",
    UnexpectedError: "Algo deu errado, por favor tente novamente!",
    Success: "",
  };

  return (
    <>
      <Head>
        <title>Email Tracking do Amorzinho</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        {profileStatus === "pending" ? (
          "Loading..."
        ) : (
          <>
            <div>
              <label htmlFor={emailInputId}>Email</label>
              <input
                id={emailInputId}
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor={passwordInputId}>Senha</label>
              <input
                id={passwordInputId}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <button onClick={login}>Entrar</button>
            </div>
            <div>{loginStatusMessageMatrix[loginStatus]}</div>
          </>
        )}
      </main>
    </>
  );
}
