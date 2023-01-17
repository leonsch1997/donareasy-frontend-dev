import { FC } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { DonationModalProps } from '../types';

export const DonationModal: FC<DonationModalProps> = ({ idDonacion, onClose, isOpen, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          DETALLE DE LA DONACIÓN
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}