import { useEffect } from 'react';
import { CartItem } from '../types/pos.types';

interface UseKeyboardEventsProps {
  showQuantityKeypad?: boolean;
  quantityKeypadItem?: CartItem | null;
  handleQuantityConfirm?: () => void;
  setShowQuantityKeypad?: (show: boolean) => void;
  setQuantityKeypadItem?: (item: CartItem | null) => void;
  setQuantityInput?: (input: string) => void;
  onF2Press?: () => void;
  onF4Press?: () => void;
  onEscapePress?: () => void;
}

export const useKeyboardEvents = (props: UseKeyboardEventsProps) => {
  const {
    showQuantityKeypad,
    handleQuantityConfirm,
    onF2Press,
    onF4Press,
    onEscapePress
  } = props;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for function keys
      if (e.key.startsWith('F')) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'F2':
          onF2Press?.();
          break;
        case 'F4':
          onF4Press?.();
          break;
        case 'Escape':
          onEscapePress?.();
          break;
        case 'Enter':
          if (showQuantityKeypad && handleQuantityConfirm) {
            handleQuantityConfirm();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showQuantityKeypad, handleQuantityConfirm, onF2Press, onF4Press, onEscapePress]);
};