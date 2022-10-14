import Logo from "../../public/logo.svg";
import styles from "./Footer.module.css";

const Footer: React.FC<{}> = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
    </footer>
  );
};

export default Footer;
