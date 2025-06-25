import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Get saved value from localStorage or fallback to initialValue
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
