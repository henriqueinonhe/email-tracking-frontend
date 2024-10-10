import Head from "next/head";
import { useEffect, useId, useState } from "react";
import { login as domainLogin } from "@/domain/user/login";
import { useRouter } from "next/router";
import { Urls } from "@/view/Urls";
import { useEffectEvent } from "@/view/hooks/useEffectEvent";
import { useProfile } from "@/view/user/useProfile";
import { makeDiv, makeH2, makeMain, makeDerived } from "named-components";
import { Input, Button } from "antd";
import styles from "./LoginPage.module.scss";

type LoginStatus =
  | "Initial"
  | "InvalidCredentials"
  | "UnexpectedError"
  | "Loading"
  | "Success";

export const LoginPage = () => {
  const [email, setEmail] = useState("");

  const trimmedEmail = email.trim();

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
    const result = await domainLogin(trimmedEmail, password);

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
    Loading: "Carregando...",
    InvalidCredentials: "Email ou senha inválido!",
    UnexpectedError: "Algo deu errado, por favor tente novamente!",
    Success: "",
  };

  const statusMessage = loginStatusMessageMatrix[loginStatus];

  const loginButtonIsDisabled =
    loginStatus === "Loading" ||
    trimmedEmail.length === 0 ||
    password.length === 0;

  return (
    <>
      <Head>
        <title>Email Tracking do Amorzinho</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Main>
        {profileStatus === "pending" ? (
          "Loading..."
        ) : (
          <Form>
            <FormTitle>Login</FormTitle>

            <InputContainer>
              <label htmlFor={emailInputId}>Email</label>

              <EmailInput
                id={emailInputId}
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor={passwordInputId}>Senha</label>

              <PasswordInput
                id={passwordInputId}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputContainer>

            <LoginButton
              type="primary"
              disabled={loginButtonIsDisabled}
              onClick={login}
            >
              Entrar
            </LoginButton>

            {statusMessage && (
              <FeedbackMessage>{statusMessage}</FeedbackMessage>
            )}
          </Form>
        )}
      </Main>
    </>
  );
};

const Main = makeMain(styles.main);

const Form = makeDiv(styles.form);

const FormTitle = makeH2(styles.formTitle);

const InputContainer = makeDiv(styles.inputContainer);

const EmailInput = makeDerived(Input, styles.emailInput);

const PasswordInput = makeDerived(Input, styles.passwordInput);

const LoginButton = makeDerived(Button, styles.loginButton);

const FeedbackMessage = makeDiv(styles.feedbackMessage);
