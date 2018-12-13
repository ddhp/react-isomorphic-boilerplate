import { useResizeEvent } from '../hooks/useResizeEvent';
import { useGlobalContext } from '../hooks/useGlobalContext';

export function ResizeHandler() {
  const [global, { setScreenSize }] = useGlobalContext();

  function resizeLogic() {
    const oldScreenSize = global.screenSize;
    // decide your resize logic here
    const newScreenSize = document.body.offsetWidth < 1024 ? 'small' : 'medium';
    if (oldScreenSize !== newScreenSize) {
      setScreenSize(newScreenSize);
    }
  }

  resizeLogic();

  useResizeEvent(resizeLogic);
  return null;
}

export default ResizeHandler;
