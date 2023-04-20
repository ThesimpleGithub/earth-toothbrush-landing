import { ReactElement } from 'react';
import reactDom from 'react-dom';

const ModalPortal = ({ children }: { children: ReactElement }) => {
  const element =
    typeof window !== 'undefined' && document.querySelector('#modal-root');
  return element && children ? reactDom.createPortal(children, element) : null;
};

export default ModalPortal;
