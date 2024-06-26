import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Welcome() {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("current useeer: ");
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="w-auto h-screen flex justify-center items-center">
      <h1 className="mb-2 font-mono text-4xl text-blur md:text-4xl">
        Welcome, <br className="block md:hidden" />
        <span className="relative">
          <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent text-rose-400">
            {currentUser?.name} <span className="text-3xl md:text-3xl">👋</span>
          </span>
          <span className="{`${styles.cursor} absolute -bottom-0 left-0 -top-1 inline-block bg-gray-900 w-full animate-type will-change`}"></span>
        </span>
      </h1>
    </div>
  );
}

export default Welcome;
