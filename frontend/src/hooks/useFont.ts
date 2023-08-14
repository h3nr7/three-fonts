import { Font, parse } from "opentype.js";
import { useEffect, useState } from "react";
import { FontConvertError } from "../libs/Errors";


export function useFont(name: string) {

  const [font, setFont] = useState<Font>();
  const [error, setErr] = useState<Error>();


  useEffect(() => {
    async function load() {
      try {
        const url = `/api/fonts/json?name=${name}`
        const res = await fetch(url, {
          method: 'get',
          headers: {
            Accept: '*/*'
          }
        });

        const arrBuff = await res.arrayBuffer();
        const f = await parse(arrBuff);
        setFont(f);
      } catch(e) {
         setErr(new FontConvertError((e as Error)?.message || 'Error loading fonts'));
      }
    }

    load();
  }, [name]);

  return {font, error};
}