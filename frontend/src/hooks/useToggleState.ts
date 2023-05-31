import { useState } from 'react'

const useToggleState = (init: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(init);
  
  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const open = () => {
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
  }

  return {isOpen, toggle, open, close};
};

export default useToggleState;
