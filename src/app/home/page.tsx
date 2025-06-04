"use client";
import HomeCard from "@/Components/Home";
import PrivateRoute from "@/utils/PrivateRoute";

const Home = () => {
  return (
    <>
      <HomeCard />
    </>
  );
};

export default PrivateRoute(Home);
