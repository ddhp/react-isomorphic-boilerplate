import { useEffect } from 'react';
import { debounce as _debounce } from 'lodash';

export function useResizeEvent(callback) {
  useEffect(() => {
    const debounced = _debounce(callback, 250);
    window.addEventListener('resize', debounced);
    return () => {
      window.removeEventListener('resize', debounced);
    };
  });
}

export default useResizeEvent;
