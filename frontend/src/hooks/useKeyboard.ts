import { useEffect, useState } from "react";


export function useKeyboard() {

  const [downKey, setDownKey] = useState<string>();
  const [upKey, setUpKey] = useState<string>();

  useEffect(() => {
    document.addEventListener('keyup', onKeyUpHandler);
    document.addEventListener('keydown', onKeyDownHandler);

    return () => {
      document.removeEventListener('keyup', onKeyUpHandler);
      document.removeEventListener('keydown', onKeyDownHandler);
    }
  }, []);

  const onKeyUpHandler = (e:KeyboardEvent) => {
    setUpKey(e.key);
  }

  const onKeyDownHandler = (e:KeyboardEvent) => {
    setDownKey(e.key);
  }

  return [downKey, upKey];

}