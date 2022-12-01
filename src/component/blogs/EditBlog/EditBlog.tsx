import React from "react";
import { useOutletContext } from "react-router-dom";
import { NoteData, RawNote, RawNoteData, Tag } from "../../../App";
import NoteForm from "../NoteForm";
import { useNoteLayout } from "../NoteLayout/NoteLayout";

type EditNoteProps = {
  availableTags: Tag[];
  onTagAdd: (data: Tag) => void;
  onSubmit: (id: string, data: NoteData) => void;
};

export const EditBlog = ({
  availableTags,
  onTagAdd,
  onSubmit,
}: EditNoteProps) => {
  const note = useNoteLayout();

  return (
    <>
      <div className="mb-4 text-center">
        <h1>Edit Note</h1>
      </div>
      <NoteForm
        title={note.title}
        body={note.body}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onTagAdd={onTagAdd}
        availableTags={availableTags}
      />
    </>
  );
};
