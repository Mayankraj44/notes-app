import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import CreateBlog from "./component/blogs/CreateBlog";
import EditBlog from "./component/blogs/EditBlog";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "./utils/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import BlogList from "./component/blogs/BlogList";
import Blog from "./component/blogs/Blog";

export type Note = {
  id: string;
} & NoteData;

export type SimpleNote = {
  id: string;
  tags: Tag[];
} & RawNote;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  body: string;
  tagIds: string[];
};
export type NoteData = {
  title: string;
  body: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function createNote({ tags, ...data }: NoteData) {
    setNotes((prev) => {
      return [
        ...prev,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onTagAdd(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<BlogList notes={notesWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <CreateBlog
              onSubmit={createNote}
              onTagAdd={onTagAdd}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<Blog />} />
          <Route path="edit" element={<EditBlog />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
