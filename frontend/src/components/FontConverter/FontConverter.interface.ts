import { Font } from "opentype.js";


export interface FontConverterProps {
  onSuccess: (e:Font) => void
  onReset: () => void
}