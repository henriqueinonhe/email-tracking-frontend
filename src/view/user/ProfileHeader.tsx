import { makeDerived, makeDiv, makeHeader } from "named-components";
import { useLoadedProfile } from "./useLoadedProfile";
import { Button } from "antd";
import styles from "./ProfileHeader.module.scss";
import { logout } from "@/domain/user/logout";
import { useRouter } from "next/router";
import { Urls } from "../Urls";

export const ProfileHeader = () => {
  const { profile } = useLoadedProfile();

  const router = useRouter();

  const onLogoutButtonClicked = async () => {
    await logout();
    router.push(Urls.home());
  };

  return (
    <Header>
      <UserWelcome>
        Olá, {profile.name} ({profile.email})
      </UserWelcome>

      <LogoutButton danger onClick={onLogoutButtonClicked}>
        Logout
      </LogoutButton>
    </Header>
  );
};

export const Header = makeHeader(styles.header);

export const UserWelcome = makeDiv();

export const LogoutButton = makeDerived(Button);
