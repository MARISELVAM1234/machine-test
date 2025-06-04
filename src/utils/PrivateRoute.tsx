"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function PrivateRoute<P extends object>(Component: React.ComponentType<P>) {
  const Auth = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      if (typeof window !== "undefined") {
        const loginData =
          localStorage.getItem("loginData") ||
          sessionStorage.getItem("loginData");
        if (!loginData || Object.keys(JSON.parse(loginData)).length === 0) {
          router.push("/");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      }
    }, [router]);

    if (isAuthenticated === null) return null;

    if (!isAuthenticated) return null;

    return <Component {...props} />;
  };
  return Auth;
}

export default PrivateRoute;
