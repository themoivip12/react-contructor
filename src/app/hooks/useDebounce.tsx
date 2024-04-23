import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useDebounce = (value: string, wait = 1200) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = debounce(() => {
      setDebounceValue(value);
    }, wait);
    timer();

    return () => timer.cancel();
  });
  return debounceValue;
};
