import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedIn = ({ user, onLogoutSuccessful }: NavBarLoggedInProps) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as {user.username}</Navbar.Text>
      <Button variant="outline-light" onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default NavBarLoggedIn;
