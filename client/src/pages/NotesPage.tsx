import { Container } from "react-bootstrap";
import NotesLoggedIn from "../components/NotesLoggedIn";
import NotesLoggedOut from "../components/NotesLoggedOut";
import { User } from "../models/user";
import styles from "../styles/NotesPage.module.css";

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <div>
      <Container className={styles.notesPage}>
        <>{loggedInUser ? <NotesLoggedIn /> : <NotesLoggedOut />}</>
        <img
          src="./FreshLogo.avif"
          alt="Fresh Notes Logo"
          className={styles.logoDance}
        />
      </Container>
    </div>
  );
};

export default NotesPage;
