import React, { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RawNote, SimpleNote, Tag } from "../../../App";
import ReactSelect from "react-select";
import NoteCard from "../NoteCard";
type NoteListData = {
  availableTags: Tag[];
  notes: SimpleNote[];
};

export const BlogList = ({ availableTags, notes }: NoteListData) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(title.toLowerCase()) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            return note.tagIds.some((id) => id === tag.id);
          }))
      );
    });
  }, [notes, title, selectedTags]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button>Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => {
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
      </Form>
      <Row xs={1} sm={2} md={3} xl={4} className="mt-4">
        {filteredNotes.map((note) => (
          <Col key={note.id} xs="auto">
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </>
  );
};
