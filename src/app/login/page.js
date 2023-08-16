"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/todos");
    }
  }, [session]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value.trim();
    const password = e.target[1].value.trim();
    console.log(email, password);
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/todos",
    });
  };

  const loginErorr = searchParams.get("error");

  /* console.log("params: ", loginErorr); */
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
          <p className={styles.loginErorr}>
            {loginErorr && "Wrong Email or Password!"}
          </p>
          <button className={styles.button}>LogIn</button>
        </form>
        <span className={styles.span}>
          You don't have an account? <Link href="/signup">Sign up</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
