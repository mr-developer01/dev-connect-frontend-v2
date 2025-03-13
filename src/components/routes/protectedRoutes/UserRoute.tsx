import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router";

const UserRoute = () => {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.user) {
      navigate("/");
    }
  }, [cookies.user, navigate]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoute;
