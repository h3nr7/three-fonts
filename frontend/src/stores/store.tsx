import { Font } from "opentype.js";
import { createContext, PropsWithChildren, useContext, useReducer, useState } from "react"

interface IStates {
  font?: Font
  json?: any
  words?: string[]
  setFont: (font:Font) => void
  setJson: (json:any) => void
  addWord: (str: string) => void
  clearWords: () => void
}

const FontContext = createContext<IStates>({
  setFont: () => {},
  setJson: () => {},
  addWord: () => {},
  clearWords: () => {}
});

export function StoreProvider({ children }: PropsWithChildren) {
  
  const [font, setFontState] = useState<Font>();
  const [json, setJsonState] = useState<any>();
  const [words, setWordsState] = useState<string[]>([]);

  const setFont = (font: Font) => setFontState(font);
  const setJson = (json: any) => setJsonState(json);
  const addWord = (str: string) => setWordsState([...words, str]);
  const  clearWords = () => setWordsState([]);

  return (
    <FontContext.Provider value={{font, json, words, setFont, setJson, addWord, clearWords}}>{children}</FontContext.Provider>
  );
}

export const useStore = () => useContext(FontContext);

