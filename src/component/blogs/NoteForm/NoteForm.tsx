import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import {
  Note,
  NoteData,
  RawNote,
  RawNoteData,
  SimpleNote,
  Tag,
} from "../../../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onTagAdd: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<SimpleNote>;

export const NoteForm = ({
  onSubmit,
  onTagAdd,
  availableTags,
  title = "",
  body = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTag, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTag,
    });
    navigate("..");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} defaultValue={title} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect
                isMulti
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onTagAdd(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTag.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="body">
              <Form.Label>MarkDown</Form.Label>
              <Form.Control
                ref={bodyRef}
                defaultValue={body}
                required
                as="textarea"
                rows={15}
              />
            </Form.Group>
          </Col>
        </Row>

        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Link to="..">
            <Button variant="outline-secondary" type="button">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};
