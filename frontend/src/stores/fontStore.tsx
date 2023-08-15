import { Font } from "opentype.js";
import { createContext, PropsWithChildren, useContext, useReducer, useState } from "react"

interface IFontStates {
  font?: Font
  setFont: (font:Font) => void
}

const FontContext = createContext<IFontStates>({
  setFont: () => {}
});

export function FontStoreProvider({ children }: PropsWithChildren) {
  
  const [font, setStoreState] = useState<Font>();

  const setFont = (font: Font) => setStoreState(font);

  return (
    <FontContext.Provider value={{font, setFont}}>{children}</FontContext.Provider>
  );
}

export const useFontStore = () => useContext(FontContext);

