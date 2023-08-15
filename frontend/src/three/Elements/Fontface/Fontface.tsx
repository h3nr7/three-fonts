import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { FontfaceProps } from "./Fontface.interface";
import { GlyphSet } from "opentype.js";
import { TextBlock } from "../TextBlock";
import { Wireframe } from "@react-three/drei";


export function Fontface({ font }: PropsWithChildren<FontfaceProps>) {

  if(!font) return null;

  const { glyphs } = font;

  // const chars = useMemo(() => glyphsGenerator(glyphs), [glyphs]);

  return (
    <group>
      <TextBlock font={font} text='G' height={0.1} reversed={false} inverted={false}>
        {/* <Wireframe /> */}
        <meshPhysicalMaterial roughness={0} color={'red'} emissive={'green'} envMapIntensity={0.2} />
      </TextBlock>
    </group>
  )
}

function glyphsGenerator(glyphs:GlyphSet) {
  const len = glyphs.length;
  const chars = []
  for (let index = 0; index < len; index++) {
    chars.push(glyphs.get(index).name);
  }

  return chars;
}