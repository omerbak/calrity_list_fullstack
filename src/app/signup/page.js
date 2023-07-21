"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      console.log(res);
      if (res.status === 201) {
        toast.success(res.statusText);
        router.push("/login");
        setError(null);
      } else if (res.status === 400) {
        setError(res.statusText);
      }
    } catch (err) {
      setError(err);
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>Clarity List</h1>
        <p className={styles.p1}>
          See your goals clearly, Achieve them easily!
        </p>
      </div>
      <div className={styles.box}>
        <p className={styles.p}>Create your account</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            className={styles.input}
          />
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
          <p className={styles.error}>{error && error}</p>
          <button className={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
