import React from "react";
import { useRouter } from "next/navigation";

function PublicRoute<P extends object>(Component: React.ComponentType<P>) {
  const Auth = (props: P) => {
    const loginData =
      localStorage.getItem("loginData") || sessionStorage.getItem("loginData");

    const router = useRouter();

    // If user is  logged in, redirect to home page
    if (!loginData || Object.keys(JSON.parse(loginData)).length > 0) {
      router.push("/home");
      return null;
    }

    return <Component {...props} />;
  };
  return Auth;
}

export default PublicRoute;
