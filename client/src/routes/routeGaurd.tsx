import { Redirect } from "react-router-dom";
import { getCookie } from "typescript-cookie";

export const GuestGuard = ({
  children,
}: {
  children: React.ReactElement | null;
}) => {
  const isUserLoggedIn = getCookie("session_id");
  if (isUserLoggedIn) {
    return <Redirect to={"/movies"} />;
  }

  return children;
};

export const AuthGaurd = ({ children }: { children: React.ReactElement }) => {
  const isUserLoggedIn = getCookie("session_id");
  if (!isUserLoggedIn) {
    return <Redirect to={"/signin"} />;
  }

  return children;
};
