"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const Todos = () => {
  const { status } = useSession();
  console.log(status);
  if (status !== "authenticated") {
    return <div>you are not loggedin</div>;
  }
  return (
    <div>
      <h1>todos</h1>
      <button onClick={() => signOut()}>logout</button>
    </div>
  );
};

export default Todos;
