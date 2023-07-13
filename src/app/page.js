import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headline}>
        <h1>Clarity List</h1>
        <h3>Ses your goals clearly, Achieve them eaisly!</h3>
      </div>
      <div className={styles.links}>
        <Link href="/signup">
          <button>Sign Up</button>
        </Link>
        <Link href="/login">
          <button>LogIn</button>
        </Link>
      </div>
    </main>
  );
}
