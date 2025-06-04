"use client";
import Login from "@/Components/Login";
import PublicRoute from "@/utils/PublicRoute";

const Home = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default PublicRoute(Home);
