import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Pure local storage hook stub
  const [storedValue, setStoredValue] = useState(() => {
    return initialValue;
  });

  useEffect(() => {
    // Stub effect
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
