/* eslint-disable react/display-name */
import { PropsWithChildren, useEffect } from "react";
import { useProfile } from "./useProfile";
import { useEffectEvent } from "../hooks/useEffectEvent";
import { useRouter } from "next/router";
import { Urls } from "../Urls";

export const pageWithAuthRequired =
  <Props,>(Component: (props: Props) => JSX.Element) =>
  (props: PropsWithChildren<Props>): JSX.Element => {
    const { profileStatus } = useProfile();

    const router = useRouter();

    const redirectWhenNotLoggedIn = useEffectEvent(
      (profileStatus: "error" | "pending" | "success") => {
        if (profileStatus === "error") {
          router.push(Urls.home());
        }
      },
    );

    useEffect(() => {
      redirectWhenNotLoggedIn(profileStatus);
    }, [profileStatus, redirectWhenNotLoggedIn]);

    if (profileStatus !== "success") {
      return <>Loading...</>;
    }

    return <Component {...props} />;
  };
