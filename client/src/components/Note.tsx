import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  onNoteClicked,
  className,
  onDeleteNoteClicked,
}: NoteProps) => {
  const {
    title,
    text,
    createdAt,
    updatedAt,
    deadline = 1,
    importance = 1,
  } = note;

  let createdUpdateText: string;
  if (updatedAt > createdAt) {
    createdUpdateText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdateText = "Created: " + formatDate(createdAt);
  }
  //use useMemo if the function formatDate was more expensive
  const urgency: number = deadline + importance;
  const borderColor =
    urgency === 8
      ? "noteCard4"
      : urgency > 5
      ? "noteCard3"
      : urgency > 3
      ? "noteCard2"
      : "";

  return (
    <Card
      className={`${styles.noteCard1} ${className} ${styles[borderColor]}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.noteText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className={`text-muted ${styles.cardFoot}`}>
        {createdUpdateText}
      </Card.Footer>
    </Card>
  );
};

export default Note;
