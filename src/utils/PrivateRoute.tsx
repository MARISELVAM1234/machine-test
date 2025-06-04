import React from "react";
import { useRouter } from "next/navigation";

function PrivateRoute<P extends object>(Component: React.ComponentType<P>) {
  const Auth = (props: P) => {
    const loginData =
      localStorage.getItem("loginData") || sessionStorage.getItem("loginData");

    const router = useRouter();

    // If user is not logged in, redirect to login page
    if (!loginData || Object.keys(JSON.parse(loginData)).length === 0) {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  };
  return Auth;
}

export default PrivateRoute;
