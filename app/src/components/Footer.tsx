import Image from "next/image";
import styles from "./../../page.module.css";

export default function Footer() {
  const dateFormatted = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className={styles.footerInnerContainer}>
      <div className={styles.footerTextContainer}>
        <div className={styles.footerGithubContainer}>
          <div className={styles.githubImageContainer}>
            <Image
              src="/github.png"
              width={35}
              height={35}
              alt="GitHub logo"
              className={styles.githubLogo}
            />
          </div>
          <div className={styles.footerText}>
            <p>See the source code for Metro Madness:</p>
            <p>
              visit{" "}
              <a
                href="https://github.com/marcos-acosta/metro-madness-client"
                target="_blank"
                rel="noreferrer"
              >
                github.com/marcos-acosta
              </a>
            </p>
          </div>
        </div>
        <div className={styles.footerCreatorContainer}>
          POST: {dateFormatted} street level entrances, elevators,
          stairway/landings, transfer areas. Made with 🚇 by{" "}
          <a
            href="https://marcos.ac"
            target="_blank"
            rel="noreferrer"
            className={styles.textLink}
          >
            Marcos Acosta
          </a>{" "}
          using{" "}
          <a
            href="https://github.com/jamespfennell/transiter"
            target="_blank"
            rel="noreferrer"
            className={styles.textLink}
          >
            Transiter
          </a>{" "}
          for real-time transit data.
        </div>
      </div>
      <div className={styles.footerBlackBar} />
    </div>
  );
}
