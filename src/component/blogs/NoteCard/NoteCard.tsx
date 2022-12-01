import { Badge, Card, Stack } from "react-bootstrap";
import { RawNote, SimpleNote } from "../../../App";
import styles from "./index.module.css";
type SimpleNoteProps = {
  note: SimpleNote;
};

export default function NoteCard({ note }: SimpleNoteProps) {
  return (
    <Card className={styles.card}>
      <Card.Body>
        <p className="text-center text-truncate">{note.title}</p>
        <Stack
          gap={1}
          direction="horizontal"
          className="justify-content-center"
        >
          {note.tags.map((tag) => (
            <Badge className="text-truncate" key={tag.id}>
              {tag.label}
            </Badge>
          ))}
        </Stack>
      </Card.Body>
    </Card>
  );
}
