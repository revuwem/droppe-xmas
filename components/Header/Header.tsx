import Logo from "../../public/logo.svg";
import styles from "./Header.module.css";

const Header: React.FC<{}> = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
};

export default Header;
