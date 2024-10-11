import { Modal } from "antd";
import { CreatePixelForm } from "./CreatePixelForm";

export type CreatePixelModalProps = {
  onClose: () => void;
};

export const CreatePixelModal = ({ onClose }: CreatePixelModalProps) => {
  return (
    <Modal
      open
      onClose={onClose}
      onCancel={onClose}
      // Hide Cancel and Ok buttons
      footer={null}
    >
      <CreatePixelForm onTrackerCreated={onClose} />
    </Modal>
  );
};
