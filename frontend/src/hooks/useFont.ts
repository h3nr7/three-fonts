import { Font, parse } from "opentype.js";
import { useEffect, useState } from "react";
import { FontConvertError } from "../libs/Errors";
import { LoadingManager } from "three";
import { FontLoader } from "../three/loaders/FontLoader";

export function useFont(name: string, isJson:boolean = false, isReverse?:boolean):[Font | undefined, any | undefined, FontConvertError | undefined] {

  const [json, setJson] = useState<any>();
  const [font, setFont] = useState<Font>();
  const [error, setErr] = useState<Error>();

  
  useEffect(() => {
    async function load(reverse:boolean = false) {
      try {
        const url = `/api/fonts/${isJson ? 'json' : 'data'}?name=${name}&reverse=${reverse}`
        const res = await fetch(url, {
          method: 'get',
          headers: {
            Accept: '*/*'
          }
        });

        if(isJson) {
          const j = await res.json();
          const loadingManager = new LoadingManager();
          const loader = new FontLoader(loadingManager);
          const jsonFont = loader.parse(j);
          setJson(jsonFont);
        } else {
          const arrBuff = await res.arrayBuffer();
          const f = await parse(arrBuff);
          setFont(f);
        }
      } catch(e) {
         setErr(new FontConvertError((e as Error)?.message || 'Error loading fonts'));
      }
    }

    load(isReverse);
  }, [name]);

  return [font, json, error];
}