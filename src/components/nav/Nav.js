"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import styles from "./nav.module.css";
import Link from "next/link";
import logo from "../../../public/default-monochrome.svg";
import Image from "next/image";

const Nav = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="clarity logo" />
        </Link>
      </div>
      <div className={styles.user_box}>
        {isAuthenticated && <p className={styles.user}>{session.user.email}</p>}
        {isAuthenticated ? (
          <button className={styles.logout} onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className={styles.login}>login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
