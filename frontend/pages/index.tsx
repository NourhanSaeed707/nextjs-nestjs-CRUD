import Welcome from "../components/Home/Welcome";
import NavBar from "../components/layout/NavBar";
import React from "react";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Welcome />
    </div>
  );
}
