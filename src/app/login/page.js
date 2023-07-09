"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Login = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
    //router.push("/todos");
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>Clarity List</h1>
        <p className={styles.p1}>
          See your goals clearly, Achieve them easily!
        </p>
      </div>
      <div className={styles.box}>
        <p className={styles.p}>Login to your account</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className={styles.input}
          />
          <button className={styles.button}>LogIn</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
