import React from "react";
import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { NoteData, SimpleNote } from "../../../App";

type NotesProps = {
  notes: SimpleNote[];
};

export default function NoteLayout({ notes }: NotesProps) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return <Navigate to="/" />;
  } else {
    return <Outlet context={note} />;
  }
}

export function useNoteLayout() {
  return useOutletContext<SimpleNote>();
}
