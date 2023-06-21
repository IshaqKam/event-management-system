import { memo } from 'react';
import Modal from '@mui/material/Modal';

type Props = {
  open: boolean;
  children: JSX.Element;
  onClose: () => void;
};

const AppModalComponent = ({ open, onClose, children }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
};

export const AppModal = memo(AppModalComponent);
