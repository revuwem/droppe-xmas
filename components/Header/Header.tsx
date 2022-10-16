import Link from "next/link";
import Logo from "../../public/logo.svg";
import styles from "./Header.module.css";

const Header: React.FC<{}> = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </header>
  );
};

export default Header;
