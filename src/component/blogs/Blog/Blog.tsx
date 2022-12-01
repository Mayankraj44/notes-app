import React from "react";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useOutlet, useOutletContext } from "react-router-dom";
import { Note, SimpleNote } from "../../../App";
import ReactMarkdown from "react-markdown";

export default function Blog() {
  const note = useOutletContext<Note>();
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>{note.title}</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="edit">
              <Button>Edit</Button>
            </Link>
            <Button variant="outline-danger">Delete</Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Row className="mt-2 mb-4">
        <Stack gap={1} direction="horizontal" className="flex-wrap">
          {note.tags.map((tag) => (
            <Badge className="text-truncate" key={tag.id}>
              {tag.label}
            </Badge>
          ))}
        </Stack>
      </Row>
      <ReactMarkdown>{note.body}</ReactMarkdown>
    </>
  );
}
