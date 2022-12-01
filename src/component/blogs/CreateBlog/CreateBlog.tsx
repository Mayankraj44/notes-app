import React from "react";
import { NoteData, Tag } from "../../../App";
import NoteForm from "../NoteForm";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onTagAdd: (tag: Tag) => void;
  availableTags: Tag[];
};

export const CreateBlog = ({
  onSubmit,
  onTagAdd,
  availableTags,
}: NoteFormProps) => {
  return (
    <>
      <div className="mb-4 text-center">
        <h1>Create Note</h1>
      </div>
      <NoteForm
        onSubmit={onSubmit}
        onTagAdd={onTagAdd}
        availableTags={availableTags}
      />
    </>
  );
};
