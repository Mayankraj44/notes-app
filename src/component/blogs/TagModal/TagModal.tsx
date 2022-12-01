import {
  Button,
  Col,
  FormControl,
  Modal,
  ModalBody,
  ModalDialog,
  ModalHeader,
  ModalTitle,
  Row,
  Stack,
} from "react-bootstrap";
import { Tag } from "../../../App";
type TagModalProps = {
  show: boolean;
  onClose: () => void;
  onUpdateTag: (id: string, value: string) => void;
  onDeleteTag: (id: string) => void;
  availableTags: Tag[];
};

export const TagModal = ({
  show,
  onClose,
  onUpdateTag,
  availableTags,
  onDeleteTag,
}: TagModalProps) => {
  return (
    <Modal show={show} onHide={onClose}>
      <ModalHeader closeButton>
        <ModalTitle>Edit Tags</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Stack gap={2}>
          {availableTags.map((tag) => (
            <Row key={tag.id}>
              <Col>
                <FormControl
                  type="text"
                  value={tag.label}
                  onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button
                  onClick={() => onDeleteTag(tag.id)}
                  variant="outline-danger"
                >
                  X
                </Button>
              </Col>
            </Row>
          ))}
        </Stack>
      </ModalBody>
    </Modal>
  );
};
