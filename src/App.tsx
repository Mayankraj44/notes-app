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
import NoteLayout from "./component/blogs/NoteLayout";

export type Note = {
  id: string;
} & NoteData;

export type SimpleNote = {
  id: string;
  tags: Tag[];
} & RawNoteData;

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

  function onNoteUpdate(id: string, data: NoteData) {
    setNotes((prev) => {
      const temp = prev.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: data.tags.map((tag) => tag.id) };
        }
        return note;
      });
      console.log("temp", temp);
      return temp;
    });
  }

  function deleteNote(id: string) {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  }

  function onTagAdd(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateTag(id: string, value: string) {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label: value };
        } else {
          return tag;
        }
      });
    });
  }

  function onDelelteTag(id: string) {
    setTags((prev) => {
      return prev.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              notes={notesWithTags}
              availableTags={tags}
              onDeleteTag={onDelelteTag}
              onUpdateTag={onUpdateTag}
            />
          }
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
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Blog onDelete={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditBlog
                onSubmit={onNoteUpdate}
                availableTags={tags}
                onTagAdd={onTagAdd}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
