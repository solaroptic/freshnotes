import { Button } from "react-bootstrap";
import styles from "../styles/utils.module.css";

interface NavBarLoggedOutProps {
  onLoginClicked: () => void;
  onSignUpClicked: () => void;
}

const NavBarLoggedOut = ({
  onLoginClicked,
  onSignUpClicked,
}: NavBarLoggedOutProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked} className="me-2">
        Sign Up
      </Button>
      <Button onClick={onLoginClicked} className={`me-2 ${styles.shrinkSpace}`}>
        Login
      </Button>
    </>
  );
};

export default NavBarLoggedOut;
