import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  hiding: boolean;
}

const Backdrop = ({ onClose }: Pick<ModalProps, 'onClose'>) => {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}
      id="backdrop"></div>
  );
};

const ModalOverlay = ({ children, hiding }: { children: ReactNode; hiding: boolean }) => {
  const [translateClass, setTranslateClass] = useState('translate-y-0 opacity-0');

  useEffect(() => {
    if (hiding) {
      setTranslateClass('translate-y-0 opacity-0');
    } else {
      setTranslateClass('-translate-y-1/2 opacity-100');
    }
  }, [hiding]);

  return (
    <div
      className={`fixed z-30 max-h-screen overflow-auto bg-transparent shadow-2xl transition-[transform,opacity] ${translateClass} duration-500 ${styles.modal} flex`}
      id="modal">
      {children}
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, onClose, hiding }) => {
  if (!portalElement) return null;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose}></Backdrop>, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay hiding={hiding}>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
