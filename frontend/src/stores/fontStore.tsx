import { Font } from "opentype.js";
import { createContext, PropsWithChildren, useContext, useReducer, useState } from "react"

interface IFontStates {
  font?: Font
  json?: any
  setFont: (font:Font) => void
  setJson: (json:any) => void
}

const FontContext = createContext<IFontStates>({
  setFont: () => {},
  setJson: () => {}
});

export function FontStoreProvider({ children }: PropsWithChildren) {
  
  const [font, setFontState] = useState<Font>();
  const [json, setJsonState] = useState<any>();

  const setFont = (font: Font) => setFontState(font);
  const setJson = (json: any) => setJsonState(json);

  return (
    <FontContext.Provider value={{font, json, setFont, setJson}}>{children}</FontContext.Provider>
  );
}

export const useFontStore = () => useContext(FontContext);

