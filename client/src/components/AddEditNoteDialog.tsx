import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { useForm } from "react-hook-form";
import TextInput from "./form/TextInput";
import { ChangeEvent, useState } from "react";
import styles from "../styles/utils.module.css";

//////////////
interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}
//////////////
///////////////////component start///////////////////
const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  ///////////////////component start///////////////////
  const [deadline, setDeadline] = useState(1); // Default selected value
  const [importance, setImportance] = useState(1); // Default selected value

  const deadlineOptions = [
    { value: 1, label: "None" },
    { value: 2, label: "Distant" },
    { value: 3, label: "Near" },
    { value: 4, label: "Immediate" },
  ];

  const importanceOptions = [
    { value: 1, label: "Low" },
    { value: 2, label: "Somewhat" },
    { value: 3, label: "Important" },
    { value: 4, label: "Critical" },
  ];

  const handleDeadlineChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    setDeadline(parseInt(event.target.value));
  };

  const handleImportanceChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    setImportance(parseInt(event.target.value));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
      deadline: 1,
      importance: 1,
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton style={{ backgroundColor: `#c7c7c7` }}>
        <img
          src="./FreshLogo.avif"
          width="30"
          height="30"
          className="d-inline-block align-top me-2"
          alt="Fresh Notes Logo"
        />
        <Modal.Title>{noteToEdit ? "Edit note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <div className="stripe"></div>
      <Modal.Body style={{ backgroundColor: `#fbfbfb` }}>
        <Form id="addEditNoteform" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />
          <TextInput
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />
          <section className={styles.flexWide}>
            <div className={styles.menuFlexDown}>
              <label htmlFor="deadline">Deadline:</label>
              <select
                id="deadline"
                value={deadline}
                {...register("deadline")}
                onChange={handleDeadlineChange}
                className="gradient"
                style={{ backgroundColor: `#c7c7c7` }}
              >
                {deadlineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.menuFlexDown}>
              <label htmlFor="importance">Importance:</label>
              <select
                id="importance"
                value={importance}
                {...register("importance")}
                onChange={handleImportanceChange}
                className="gradient"
                style={{ backgroundColor: `#c7c7c7` }}
              >
                {importanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: `#c7c7c7` }}>
        <Button
          type="submit"
          form="addEditNoteform"
          disabled={isSubmitting}
          className="gradient"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
