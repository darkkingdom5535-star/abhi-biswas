
import { useEffect } from 'react';

const useDisableInteractions = () => {
  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextmenu);
    document.addEventListener('keydown', handleKeydown);

    // FIX: Fix for Property 'webkitTouchCallout' does not exist on type 'CSSStyleDeclaration'.
    (document.documentElement.style as any).webkitTouchCallout = 'none';
    document.documentElement.style.webkitUserSelect = 'none';
    // FIX: Fix for Property 'msUserSelect' does not exist on type 'CSSStyleDeclaration'.
    (document.documentElement.style as any).msUserSelect = 'none'; 
    document.documentElement.style.userSelect = 'none';

    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
      document.removeEventListener('keydown', handleKeydown);

      // FIX: Fix for Property 'webkitTouchCallout' does not exist on type 'CSSStyleDeclaration'.
      (document.documentElement.style as any).webkitTouchCallout = '';
      document.documentElement.style.webkitUserSelect = '';
      // FIX: Fix for Property 'msUserSelect' does not exist on type 'CSSStyleDeclaration'.
      (document.documentElement.style as any).msUserSelect = '';
      document.documentElement.style.userSelect = '';
    };
  }, []);
};

export default useDisableInteractions;
