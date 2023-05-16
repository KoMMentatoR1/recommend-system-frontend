import { FC } from 'react'
import { ModalContainer } from '../style/style'
import { Modal } from '@mui/material'

interface BaseModalProps {
  open: boolean
  setClose?: () => void
  children: React.ReactElement
}

export const BaseModal: FC<BaseModalProps> = ({ open, setClose, children }) => {
  return (
    <Modal open={open} onClose={setClose}>
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  )
}
